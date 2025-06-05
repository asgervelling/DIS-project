import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Total profit = sum ((rate - cost - discount) * quantity).
 * 
 * rate, discount, quantity \in transactions.
 * cost in menu_items.
 */
export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT SUM((t.rate - i.cost - t.discount) * t.quantity)
      AS total_profit
      FROM transaction_items t JOIN menu_items i
      ON t.iid = i.iid`
    );
    const totalProfit = rows[0]["total_profit"];
    if (!totalProfit) {
      return NextResponse.json(
        { error: "No result for query" },
        { status: 404 }
      )
    }
    return NextResponse.json({ totalProfit });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
