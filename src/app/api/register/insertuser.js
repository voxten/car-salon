"use server";

import { Client } from 'pg';
import bcrypt from 'bcrypt'; // Do haszowania hasła

// Tworzymy połączenie z bazą danych PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Łączenie z bazą danych
await client.connect();

/**
 * Rejestracja nowego użytkownika
 * @param {string} username - Nazwa użytkownika
 * @param {string} email - Adres e-mail
 * @param {string} password - Hasło użytkownika
 * @param {string} role - Rola użytkownika (np. 'client', 'admin')
 */
export async function registerUser(username, email, password, role) {
    try {
        // Sprawdzamy, czy użytkownik już istnieje
        const checkUserQuery = 'SELECT * FROM users WHERE email = $1 OR username = $2';
        const existingUser = await client.query(checkUserQuery, [email, username]);

        if (existingUser.rows.length > 0) {
            return { success: false, message: 'User already exists' };
        }

        // Haszowanie hasła przed zapisaniem
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tworzymy zapytanie do dodania nowego użytkownika
        const insertUserQuery = `
            INSERT INTO users (username, email, password, role)
            VALUES ($1, $2, $3, $4)
        `;
        await client.query(insertUserQuery, [username, email, hashedPassword, role]);

        return { success: true, message: 'User registered successfully' };
    } catch (error) {
        console.error("Error during user registration:", error);
        return { success: false, message: 'Database error', error };
    }
}

/**
 * Funkcja logująca użytkownika po jego e-mailu lub nazwie użytkownika
 * @param {string} username - Nazwa użytkownika
 * @param {string} password - Hasło użytkownika
 */
export async function loginUser(username, password) {
    try {
        // Pobieramy dane użytkownika z bazy danych
        const query = 'SELECT * FROM users WHERE username = $1 OR email = $2';
        const res = await client.query(query, [username, username]);

        if (res.rows.length === 0) {
            return { success: false, message: 'User not found' };
        }

        const user = res.rows[0];
        // Sprawdzamy, czy hasło pasuje
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            return { success: true, message: 'Login successful', user };
        } else {
            return { success: false, message: 'Invalid password' };
        }
    } catch (error) {
        console.error("Error during user login:", error);
        return { success: false, message: 'Database error', error };
    }
}

