import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

import { whereClauseOfPeriod } from "../utils/where-period";

/**
 * Total cost = sum (cost * quantity).
 */
export async function GET(req: NextRequest) {
  try {
    const period = req.nextUrl.searchParams.get("period") ?? "7d";
    const whereClause = whereClauseOfPeriod(period);

    const { rows } = await pool.query(
      `SELECT SUM(i.cost * t.quantity) as total_cost
      FROM transaction_items t
      JOIN menu_items i
      ON t.iid = i.iid
      JOIN transactions tr ON t.tid = tr.tid ${whereClause}`
    );
    const totalCost = rows[0]["total_cost"];
    if (!totalCost) {
      return NextResponse.json(
        { error: "No result for query" },
        { status: 404 }
      )
    }
    return NextResponse.json({ totalCost });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
