import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { intervalPair } from "../utils/interval-pair";

export type Top5Products = { top5: { name: string; profit: number }[] };

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

    const top5 = await pool.query(
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

    return NextResponse.json({
      top5: top5.rows.map((r) => ({
        ...r,
        profit: parseFloat(r.profit),
      })),
    }) as NextResponse<Top5Products>;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
