import { NextResponse } from "next/server";

import { pool } from "@/lib/db";

export type Transaction = {
  date: string;
  billNo: string;
  revenue: number;
  items: number;
  profit: number;
};

export type Transactions = {
  transactions: Transaction[];
};

export async function GET() {
  try {
    const res = await pool.query(
      `SELECT
        tr.date, tr.bill_no,
        SUM(i.total) AS revenue,
        SUM(i.quantity) AS items,
        SUM((i.rate - mi.cost) * i.quantity - i.discount) AS profit
      FROM transactions tr
      JOIN transaction_items i ON tr.tid = i.tid
      JOIN menu_items mi ON i.iid = mi.iid
      GROUP BY tr.date, tr.bill_no
      ORDER BY tr.date DESC
      LIMIT 100`
    );

    return NextResponse.json({
      transactions: res.rows.map((r) => ({
        date: r.date,
        billNo: r.bill_no,
        revenue: parseFloat(r.revenue),
        items: parseInt(r.items, 10),
        profit: parseFloat(r.profit),
      })),
    }) as NextResponse<Transactions>;
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
