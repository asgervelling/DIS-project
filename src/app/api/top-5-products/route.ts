import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { intervalPair } from "../utils/interval-pair";

/**
 * Top 5 most profitable products.
 * 
 * Profit = sum ((rate - cost - discount) * quantity),
 * grouped by menu_item's name.
 */
export async function GET(req: NextRequest) {
  try {
    const period = req.nextUrl.searchParams.get("period") ?? "7d";
    const intervals = intervalPair(period);

    const current = await pool.query(
      `SELECT i.name AS item,
        SUM((t.rate - i.cost - t.discount) * t.quantity) AS profit
        FROM transaction_items t
      JOIN menu_items i ON t.iid = i.iid
      JOIN transactions tr ON t.tid = tr.tid
      WHERE ${intervals.current}
      GROUP BY i.name
      ORDER BY profit DESC
      LIMIT 5;`
    );

    const previous = await pool.query(
      `SELECT i.name AS item,
        SUM((t.rate - i.cost - t.discount) * t.quantity) AS profit
        FROM transaction_items t
      JOIN menu_items i ON t.iid = i.iid
      JOIN transactions tr ON t.tid = tr.tid
      WHERE ${intervals.previous}
      GROUP BY i.name
      ORDER BY profit DESC
      LIMIT 5;`
    );
    
    return NextResponse.json({ 
      current: current.rows,
      previous: previous.rows
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
