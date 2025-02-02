"use server";

import { Client } from 'pg';
import bcrypt from 'bcrypt'; // Do porównywania hasła

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
 * Logowanie użytkownika
 * @param {string} username - Nazwa użytkownika lub email
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
