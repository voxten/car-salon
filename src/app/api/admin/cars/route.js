import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    if (type === "users") {
      const result = await sql`SELECT id, name FROM users`;
      return NextResponse.json(result.rows, { status: 200 });
    }
    
    if (type === "cars") {
      const result = await sql`SELECT id, name FROM cars`;
      return NextResponse.json(result.rows, { status: 200 });
    }
    
    return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
