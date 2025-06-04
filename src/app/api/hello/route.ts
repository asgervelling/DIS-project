import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { rows } = await pool.query("SELECT * FROM menu_items");
    return NextResponse.json({ rows });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
