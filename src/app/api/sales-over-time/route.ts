import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Sales over Time.
 * Date i = sum (rate * quantity + tax - discount).
 */
export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT
        DATE(t.date) AS day,
        SUM(i.rate * i.quantity + i.tax - i.discount) AS revenue
      FROM transaction_items i
      JOIN transactions t ON i.tid = t.tid
      GROUP BY day
      ORDER BY day`
    );
    const salesOverTime = rows;
    if (salesOverTime.length === 0) {
      return NextResponse.json(
        { error: "0 results found" },
        { status: 404 }
      )
    }
    return NextResponse.json({ salesOverTime })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
