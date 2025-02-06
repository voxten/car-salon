import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  console.log("Fetching reservations for user ID:", userId); // Logowanie

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const result = await sql`
      SELECT r.id, c.name AS car_name, c.image, r.start_date, r.end_date, r.total_amount, r.status
      FROM reservations r
      JOIN cars c ON r.car_id = c.id
      WHERE r.user_id = ${userId}
    `;

    console.log("Query result:", result.rows); // Logowanie wyniku zapytania

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Database error:", error); // Logowanie błędu
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    );
  }
}
