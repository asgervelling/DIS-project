import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { IntervalPair, intervalPair } from "../utils/interval-pair";

export type ProfitPair = IntervalPair<{ total_profit: number | undefined }>;

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
      current: current.rows[0],
      previous: previous.rows[0]
    }) as NextResponse<ProfitPair>;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
