import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { intervalPair } from "../utils/interval-pair";

/**
 * Total profit = sum ((rate - cost - discount) * quantity).
 * 
 * rate, discount, quantity \in transactions.
 * cost in menu_items.
 */
export async function GET(req: NextRequest) {
  try {
    const period = req.nextUrl.searchParams.get("period") ?? "7d";
    const intervals = intervalPair(period);

    const current = await pool.query(
      `SELECT SUM((t.rate - i.cost - t.discount) * t.quantity)
      AS total_profit
      FROM transaction_items t JOIN menu_items i
      ON t.iid = i.iid
      JOIN transactions tr ON t.tid = tr.tid
      WHERE ${intervals.current}`
    );
    
    const previous = await pool.query(
      `SELECT SUM((t.rate - i.cost - t.discount) * t.quantity)
      AS total_profit
      FROM transaction_items t JOIN menu_items i
      ON t.iid = i.iid
      JOIN transactions tr ON t.tid = tr.tid
      WHERE ${intervals.previous}`
    );
    
    return NextResponse.json({ 
      current: current.rows,
      previous: previous.rows
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
