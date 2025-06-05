import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { whereClauseOfPeriod } from "../utils/where-period";

/**
 * Profit margin = (Total profit / Total revenue) * 100.
 */
export async function GET(req: NextRequest) {
  try {
    const period = req.nextUrl.searchParams.get("period") ?? "7d";
    const whereClause = whereClauseOfPeriod(period);

    const { rows } = await pool.query(
      `SELECT
        SUM((t.rate - i.cost - t.discount) * t.quantity) * 100 /
        SUM(t.rate * t.quantity + t.tax - t.discount) AS profit_margin
      FROM transaction_items t
      JOIN menu_items i ON t.iid = i.iid
      JOIN transactions tr ON t.tid = tr.tid ${whereClause}`
    );
    const profitMargin = rows[0]["profit_margin"];
    if (!profitMargin) {
      return NextResponse.json(
        { error: "No result for query" },
        { status: 404 }
      )
    }
    return NextResponse.json({ profitMargin });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
