"use server";

import sql from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'car_salon.db');
const db = sql(dbPath);

export async function getCars() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
        console.log("Fetching cars from database...");
        return db.prepare('SELECT * FROM cars').all();
    } catch (error) {
        console.error("Database error:", error);
        return [];
    }
}

export async function getCar(slug) {
    return db.prepare('SELECT * FROM cars WHERE slug = ?').get(slug);
}