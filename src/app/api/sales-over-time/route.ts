import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { whereClauseOfPeriod } from "../utils/where-period";

/**
 * Sales over Time.
 * Date i = sum (rate * quantity + tax - discount).
 */
export async function GET(req: NextRequest) {
  try {
    const period = req.nextUrl.searchParams.get("period") ?? "7d";
    const whereClause = whereClauseOfPeriod(period);

    const { rows } = await pool.query(
      `SELECT
        DATE(tr.date) AS day,
        SUM(i.rate * i.quantity + i.tax - i.discount) AS revenue
      FROM transaction_items i
      JOIN transactions tr ON i.tid = tr.tid
      ${whereClause}
      GROUP BY day
      ORDER BY day`
    );
    const salesOverTime = rows;
    if (salesOverTime.length === 0) {
      return NextResponse.json(
        { error: "0 results found" },
        { status: 404 }
      )
    }
    return NextResponse.json({ salesOverTime })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
