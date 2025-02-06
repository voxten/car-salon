require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const dummyCars = [
    {
        slug: 'toyota-corolla-2022',
        name: 'Toyota Corolla',
        color: 'Red',
        brand: 'Toyota',
        image: '/',
        model: 'Corolla',
        version: '2022',
        price_per_day: 45.99,
        fuel_usage: 6.5,
        fuel_type: 'Petrol',
        engine_name: '1.8L I4',
        power: 139,
        acceleration: 8.5,
        max_speed: 180,
        gearbox_type: 'Automatic',
        body_type: 'Sedan',
        production_year: 2022,
        information: 'Reliable and fuel-efficient sedan.'
    },
    {
        slug: 'honda-civic-2023',
        name: 'Honda Civic',
        color: 'Blue',
        brand: 'Honda',
        image: '/',
        model: 'Civic',
        version: '2023',
        price_per_day: 50.99,
        fuel_usage: 6.2,
        fuel_type: 'Petrol',
        engine_name: '2.0L I4',
        power: 158,
        acceleration: 7.9,
        max_speed: 190,
        gearbox_type: 'Automatic',
        body_type: 'Sedan',
        production_year: 2023,
        information: 'Sporty and efficient compact sedan.'
    },
    {
        slug: 'ford-mustang-gt-2021',
        name: 'Ford Mustang GT',
        color: 'Yellow',
        brand: 'Ford',
        image: '/',
        model: 'Mustang GT',
        version: '2021',
        price_per_day: 85.99,
        fuel_usage: 12.5,
        fuel_type: 'Petrol',
        engine_name: '5.0L V8',
        power: 450,
        acceleration: 4.2,
        max_speed: 250,
        gearbox_type: 'Manual',
        body_type: 'Coupe',
        production_year: 2021,
        information: 'Iconic American muscle car with V8 power.'
    },
    {
        slug: 'tesla-model-3-2022',
        name: 'Tesla Model 3',
        color: 'White',
        brand: 'Tesla',
        image: '/',
        model: 'Model 3',
        version: '2022',
        price_per_day: 65.99,
        fuel_usage: 0,
        fuel_type: 'Electric',
        engine_name: 'Electric Motor',
        power: 283,
        acceleration: 4.4,
        max_speed: 233,
        gearbox_type: 'Automatic',
        body_type: 'Sedan',
        production_year: 2022,
        information: 'High-tech electric sedan with great range.'
    },
    {
        slug: 'bmw-x5-2023',
        name: 'BMW X5',
        color: 'Black',
        brand: 'BMW',
        image: '/',
        model: 'X5',
        version: '2023',
        price_per_day: 90.99,
        fuel_usage: 9.2,
        fuel_type: 'Diesel',
        engine_name: '3.0L I6 Turbo',
        power: 335,
        acceleration: 5.3,
        max_speed: 250,
        gearbox_type: 'Automatic',
        body_type: 'SUV',
        production_year: 2023,
        information: 'Luxury SUV with powerful engine and comfort.'
    },
    {
        slug: 'audi-a4-2022',
        name: 'Audi A4',
        color: 'Silver',
        brand: 'Audi',
        image: '/',
        model: 'A4',
        version: '2022',
        price_per_day: 75.99,
        fuel_usage: 7.8,
        fuel_type: 'Petrol',
        engine_name: '2.0L I4 Turbo',
        power: 201,
        acceleration: 6.3,
        max_speed: 240,
        gearbox_type: 'Automatic',
        body_type: 'Sedan',
        production_year: 2022,
        information: 'Premium compact sedan with refined performance.'
    },
    {
        slug: 'mercedes-c300-2022',
        name: 'Mercedes-Benz C300',
        color: 'Gray',
        brand: 'Mercedes-Benz',
        image: '/',
        model: 'C300',
        version: '2022',
        price_per_day: 85.99,
        fuel_usage: 8.0,
        fuel_type: 'Petrol',
        engine_name: '2.0L I4 Turbo',
        power: 255,
        acceleration: 5.9,
        max_speed: 250,
        gearbox_type: 'Automatic',
        body_type: 'Sedan',
        production_year: 2022,
        information: 'Luxury sedan with elegant design and performance.'
    },
    {
        slug: 'chevrolet-camaro-2023',
        name: 'Chevrolet Camaro',
        color: 'Red',
        brand: 'Chevrolet',
        image: '/',
        model: 'Camaro',
        version: '2023',
        price_per_day: 95.99,
        fuel_usage: 10.7,
        fuel_type: 'Petrol',
        engine_name: '6.2L V8',
        power: 455,
        acceleration: 4.0,
        max_speed: 250,
        gearbox_type: 'Manual',
        body_type: 'Coupe',
        production_year: 2023,
        information: 'Powerful and stylish American muscle car.'
    },
    {
        slug: 'subaru-outback-2024',
        name: 'Subaru Outback',
        color: 'Green',
        brand: 'Subaru',
        image: '/',
        model: 'Outback',
        version: '2024',
        price_per_day: 65.99,
        fuel_usage: 8.5,
        fuel_type: 'Petrol',
        engine_name: '2.4L Turbo Boxer-4',
        power: 260,
        acceleration: 6.2,
        max_speed: 210,
        gearbox_type: 'Automatic',
        body_type: 'SUV',
        production_year: 2024,
        information: 'Rugged all-wheel drive SUV with turbo power.'
    },
    {
        slug: 'volvo-xc60-2023',
        name: 'Volvo XC60',
        color: 'White',
        brand: 'Volvo',
        image: '/',
        model: 'XC60',
        version: '2023',
        price_per_day: 85.99,
        fuel_usage: 7.5,
        fuel_type: 'Hybrid',
        engine_name: '2.0L Turbo Hybrid',
        power: 400,
        acceleration: 5.2,
        max_speed: 230,
        gearbox_type: 'Automatic',
        body_type: 'SUV',
        production_year: 2023,
        information: 'Luxury hybrid SUV with advanced safety features.'
    },
    {
        slug: 'mazda-mx5-2023',
        name: 'Mazda MX-5',
        color: 'Blue',
        brand: 'Mazda',
        image: '/',
        model: 'MX-5',
        version: '2023',
        price_per_day: 70.99,
        fuel_usage: 6.8,
        fuel_type: 'Petrol',
        engine_name: '2.0L I4',
        power: 181,
        acceleration: 5.7,
        max_speed: 220,
        gearbox_type: 'Manual',
        body_type: 'Convertible',
        production_year: 2023,
        information: 'Lightweight and fun-to-drive roadster.'
    },
    {
        slug: 'porsche-cayenne-2024',
        name: 'Porsche Cayenne',
        color: 'Black',
        brand: 'Porsche',
        image: '/',
        model: 'Cayenne',
        version: '2024',
        price_per_day: 120.99,
        fuel_usage: 9.5,
        fuel_type: 'Petrol',
        engine_name: '3.0L V6 Turbo',
        power: 340,
        acceleration: 5.4,
        max_speed: 245,
        gearbox_type: 'Automatic',
        body_type: 'SUV',
        production_year: 2024,
        information: 'Premium performance SUV with luxurious comfort.'
    }
];

async function setupDatabase() {
    await client.connect();

    await client.query(`DROP TABLE IF EXISTS cars CASCADE;`);
    await client.query(`DROP TABLE IF EXISTS users CASCADE;`);

    await client.query(`
    CREATE TABLE cars (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      image TEXT NOT NULL,
      color TEXT NOT NULL,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      version TEXT NOT NULL,
      price_per_day REAL NOT NULL,
      fuel_usage REAL NOT NULL,
      fuel_type TEXT NOT NULL,
      engine_name TEXT NOT NULL,
      power INTEGER NOT NULL,
      acceleration REAL NOT NULL,
      max_speed INTEGER NOT NULL,
      gearbox_type TEXT NOT NULL,
      body_type TEXT NOT NULL,
      production_year INTEGER NOT NULL,
      information TEXT
    );
  `);

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL
    );
  `);

    const insertCarQuery = `
    INSERT INTO cars (slug, name, color, brand, image, model, version, price_per_day,
      fuel_usage, fuel_type, engine_name, power, acceleration, max_speed,
      gearbox_type, body_type, production_year, information)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
  `;

    for (const car of dummyCars) {
        await client.query(insertCarQuery, Object.values(car));
    }

    const insertUserQuery = `
    INSERT INTO users (username, password, email, role)
    VALUES ($1, $2, $3, $4)
  `;

    console.log('Database initialized successfully');
    await client.end();
}

setupDatabase().catch(console.error);
