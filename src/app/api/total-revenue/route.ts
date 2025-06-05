import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { whereClauseOfPeriod } from "../utils/where-period";

/**
 * Total revenue = sum (rate * quantity + tax - discount).
 * 
 * The rate is the price of an item, excluding tax.
 * Similarly, tax is not a part of profit calculation, rate is.
 */
export async function GET(req: NextRequest) {
  try {
    const period = req.nextUrl.searchParams.get("period") ?? "7d";
    const whereClause = whereClauseOfPeriod(period);

    const { rows } = await pool.query(
      `SELECT SUM(rate * quantity + tax - discount)
      AS total_revenue FROM transaction_items t
      JOIN transactions tr ON t.tid = tr.tid
      ${whereClause}`
    );
    const totalRevenue = rows[0]["total_revenue"];
    if (!totalRevenue) {
      return NextResponse.json(
        { error: "No result for query" },
        { status: 404 }
      )
    }
    return NextResponse.json({ totalRevenue });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
