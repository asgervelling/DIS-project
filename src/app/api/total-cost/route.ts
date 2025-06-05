import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Total cost = sum (cost * quantity).
 */
export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT SUM(i.cost * t.quantity) as total_cost
      FROM transaction_items t
      JOIN menu_items i
      ON t.iid = i.iid;`
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
