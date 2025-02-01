import { NextResponse } from "next/server";
import sql from "better-sqlite3";
import path from "path";
import bcrypt from "bcrypt";

const dbPath = path.resolve(process.cwd(), "car_salon.db");
const db = sql(dbPath);

export async function POST(request) {
  const { username, email, password } = await request.json();

  // Walidacja
  if (!username || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  // Sprawdź czy użytkownik już istnieje
  const existingUser = db
    .prepare("SELECT * FROM users WHERE email = ? OR username = ?")
    .get(email, username);

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  // Hashowanie hasła
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Wstaw nowego użytkownika do bazy
    const stmt = db.prepare(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)"
    );
    stmt.run(username, email, hashedPassword, "client");

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Database error" },
      { status: 500 }
    );
  }
}