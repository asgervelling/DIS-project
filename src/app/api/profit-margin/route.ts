import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { IntervalPair, intervalPair } from "../utils/interval-pair";

export type MarginPair = IntervalPair<{ profit_margin: number | undefined }>

/**
 * Profit margin = (Total profit / Total revenue) * 100.
 */
export async function GET(req: NextRequest) {
  try {
    const period = req.nextUrl.searchParams.get("period") ?? "7d";
    const intervals = intervalPair(period);

    const current = await pool.query(
      `SELECT
        SUM((t.rate - i.cost - t.discount) * t.quantity) * 100 /
        SUM(t.rate * t.quantity + t.tax - t.discount) AS profit_margin
      FROM transaction_items t
      JOIN menu_items i ON t.iid = i.iid
      JOIN transactions tr ON t.tid = tr.tid
      WHERE ${intervals.current}`
    );

    const previous = await pool.query(
      `SELECT
        SUM((t.rate - i.cost - t.discount) * t.quantity) * 100 /
        SUM(t.rate * t.quantity + t.tax - t.discount) AS profit_margin
      FROM transaction_items t
      JOIN menu_items i ON t.iid = i.iid
      JOIN transactions tr ON t.tid = tr.tid
      WHERE ${intervals.previous}`
    );

    return NextResponse.json({ 
      current: current.rows[0],
      previous: previous.rows[0]
    }) as NextResponse<MarginPair>;;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
