"use server";

import { Client } from 'pg';

// Create a new instance of the PostgreSQL client using the DATABASE_URL environment variable
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Connect to the database
await client.connect();

export async function updateCar(slug, data) {
    try {
        const query = `
            UPDATE cars 
            SET 
                name = $1,
                brand = $2, 
                model = $3, 
                version = $4, 
                color = $5, 
                price_per_day = $6, 
                fuel_type = $7, 
                fuel_usage = $8, 
                engine_name = $9, 
                power = $10, 
                acceleration = $11, 
                max_speed = $12, 
                gearbox_type = $13, 
                body_type = $14, 
                production_year = $15, 
                information = $16,
                image = $17
            WHERE slug = $18
        `;

        const values = [
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
            data.image,
            slug,
        ];

        await client.query(query, values);

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
        const res = await client.query('SELECT * FROM cars');
        return res.rows;
    } catch (error) {
        console.error("Database error:", error);
        return [];
    }
}

export async function getCar(slug) {
    try {
        const res = await client.query('SELECT * FROM cars WHERE slug = $1', [slug]);
        return res.rows[0]; // Return the first result since it's a unique slug
    } catch (error) {
        console.error("Error fetching car:", error);
        return null;
    }
}

export async function insertCar(data) {
    try {
        const query = `
            INSERT INTO cars (
                slug, name, brand, image, model, version, color, price_per_day, 
                fuel_type, fuel_usage, engine_name, power, acceleration, 
                max_speed, gearbox_type, body_type, production_year, information
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 
                $13, $14, $15, $16, $17, $18
            )
        `;

        const values = [
            data.slug,
            data.name,
            data.brand,
            data.image,
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
        ];

        await client.query(query, values);
        return { success: true };
    } catch (error) {
        console.error("Error inserting car:", error);
        return { success: false, error };
    }
}


