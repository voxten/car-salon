import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { carId, userId, rentalDays, totalCost } = await request.json();

    console.log("Creating reservation for user ID:", userId); // Logowanie

    if (!carId || !userId || !rentalDays || !totalCost) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Pobranie aktualnej daty jako start rezerwacji
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + rentalDays);

    const result = await sql`
      INSERT INTO reservations (car_id, user_id, start_date, end_date, total_amount, status)
      VALUES (${carId}, ${userId}, ${startDate}, ${endDate}, ${totalCost}, 'pending')
      RETURNING *;
    `;

    console.log("Reservation created:", result.rows[0]); // Logowanie wyniku

    return NextResponse.json({ success: true, reservation: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error); // Logowanie błędu
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 });
  }
}
