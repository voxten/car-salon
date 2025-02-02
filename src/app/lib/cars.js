"use server";

import sql from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'car_salon.db');
const db = sql(dbPath);

export async function updateCar(slug, data) {
    try {
        const stmt = db.prepare(`
            UPDATE cars 
            SET 
                name = ?,
                brand = ?, 
                model = ?, 
                version = ?, 
                color = ?, 
                price_per_day = ?, 
                fuel_type = ?, 
                fuel_usage = ?, 
                engine_name = ?, 
                power = ?, 
                acceleration = ?, 
                max_speed = ?, 
                gearbox_type = ?, 
                body_type = ?, 
                production_year = ?, 
                information = ? 
            WHERE slug = ?
        `);

        stmt.run(
            data.name,
            data.brand,
            data.model,
            data.version,
            data.color,
            data.price_per_day,
            data.fuel_type,
            data.fuel_usage,
            data.engine_name,
            data.power,
            data.acceleration,
            data.max_speed,
            data.gearbox_type,
            data.body_type,
            data.production_year,
            data.information,
            slug
        );

        return { success: true };
    } catch (error) {
        console.error("Error updating car:", error);
        return { success: false, error };
    }
}

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
