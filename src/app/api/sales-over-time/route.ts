import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { intervalPair } from "../utils/interval-pair";

/**
 * Sales over Time.
 * Date i = sum (rate * quantity + tax - discount).
 */
export async function GET(req: NextRequest) {
  try {
    const period = req.nextUrl.searchParams.get("period") ?? "7d";
    const intervals = intervalPair(period);

    const current = await pool.query(
      `SELECT
        DATE(tr.date) AS day,
        SUM(i.rate * i.quantity + i.tax - i.discount) AS revenue
      FROM transaction_items i
      JOIN transactions tr ON i.tid = tr.tid
      WHERE ${intervals.current}
      GROUP BY day
      ORDER BY day`
    );

    const previous = await pool.query(
      `SELECT
        DATE(tr.date) AS day,
        SUM(i.rate * i.quantity + i.tax - i.discount) AS revenue
      FROM transaction_items i
      JOIN transactions tr ON i.tid = tr.tid
      WHERE ${intervals.previous}
      GROUP BY day
      ORDER BY day`
    );

    return NextResponse.json({ 
      current: current.rows,
      previous: previous.rows
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
