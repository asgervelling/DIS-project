import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { whereClauseOfPeriod } from "../utils/where-period";

/**
 * Top 5 most profitable products.
 * 
 * Profit = sum ((rate - cost - discount) * quantity),
 * grouped by menu_item's name.
 */
export async function GET(req: NextRequest) {
  try {
    const period = req.nextUrl.searchParams.get("period") ?? "7d";
    const whereClause = whereClauseOfPeriod(period);

    const { rows } = await pool.query(
      `SELECT i.name AS item,
        SUM((t.rate - i.cost - t.discount) * t.quantity) AS profit
        FROM transaction_items t
      JOIN menu_items i ON t.iid = i.iid
      JOIN transactions tr ON t.tid = tr.tid
      ${whereClause}
      GROUP BY i.name
      ORDER BY profit DESC
      LIMIT 5;`
    );
    const top5Products = rows;
    if (top5Products.length === 0) {
      return NextResponse.json(
        { error: "0 results found" },
        { status: 404 }
      )
    }
    return NextResponse.json({ top5Products })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
