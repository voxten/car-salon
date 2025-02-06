import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`
      SELECT r.id, r.user_id, c.name AS car_name, c.slug, c.image, r.start_date, r.end_date, r.total_amount, r.status
      FROM reservations r
      JOIN cars c ON r.car_id = c.id
    `;

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Reservation ID is required" }, { status: 400 });
    }

    await sql`DELETE FROM reservations WHERE id = ${id}`;

    return NextResponse.json({ message: "Reservation deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete reservation" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, start_date, end_date, total_amount, status } = await request.json();

    if (!id || !start_date || !end_date || !total_amount || !status) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await sql`
      UPDATE reservations
      SET start_date = ${start_date}, end_date = ${end_date}, total_amount = ${total_amount}, status = ${status}
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: "Reservation updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update reservation" }, { status: 500 });
  }
}
