import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { intervalPair } from "../utils/interval-pair";

/**
 * Total revenue = sum (rate * quantity + tax - discount).
 * 
 * The rate is the price of an item, excluding tax.
 * Similarly, tax is not a part of profit calculation, rate is.
 */
export async function GET(req: NextRequest) {
  try {
    const period = req.nextUrl.searchParams.get("period") ?? "7d";
    const intervals = intervalPair(period);

    const current = await pool.query(
      `SELECT SUM(rate * quantity + tax - discount)
      AS total_revenue FROM transaction_items t
      JOIN transactions tr ON t.tid = tr.tid
      WHERE ${intervals.current}`
    );

    const previous = await pool.query(
      `SELECT SUM(rate * quantity + tax - discount)
      AS total_revenue FROM transaction_items t
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
