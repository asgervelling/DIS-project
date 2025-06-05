import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { IntervalPair, intervalPair } from "../utils/interval-pair";

export type CostPair = IntervalPair<{ total_cost: number | undefined }>;

/**
 * Total cost = sum (cost * quantity).
 */
export async function GET(req: NextRequest) {
  try {
    const period = req.nextUrl.searchParams.get("period") ?? "7d";
    const intervals = intervalPair(period);

    const current = await pool.query(
      `SELECT SUM(i.cost * t.quantity) as total_cost
      FROM transaction_items t
      JOIN menu_items i
      ON t.iid = i.iid
      JOIN transactions tr ON t.tid = tr.tid
      WHERE ${intervals.current}`
    );
    
    const previous = await pool.query(
      `SELECT SUM(i.cost * t.quantity) as total_cost
      FROM transaction_items t
      JOIN menu_items i
      ON t.iid = i.iid
      JOIN transactions tr ON t.tid = tr.tid
      WHERE ${intervals.previous}`
    );
    
    return NextResponse.json({ 
      current: current.rows[0],
      previous: previous.rows[0]
    }) as NextResponse<CostPair>;;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
