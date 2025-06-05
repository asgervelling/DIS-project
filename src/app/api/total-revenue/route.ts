import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Total revenue = sum (rate * quantity + tax - discount).
 * 
 * The rate is the price of an item, excluding tax.
 * Similarly, tax is not a part of profit calculation, rate is.
 */
export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT SUM(rate * quantity + tax - discount)
      AS total_revenue FROM transaction_items`
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
