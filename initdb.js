const sql = require('better-sqlite3');
const db = sql('car_salon.db');

db.prepare(`DROP TABLE IF EXISTS cars`).run();
db.prepare(`DROP TABLE IF EXISTS users`).run();

const dummyCars = [
    {
        slug: 'toyota-corolla-2022',
        name: 'Toyota Corolla',
        image: '/images/corolla.jpg',
        color: 'Red',
        brand: 'Toyota',
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
        slug: 'bmw-x5-2023',
        name: 'BMW X5',
        image: '/images/bmw_x5.jpg',
        color: 'Black',
        brand: 'BMW',
        model: 'X5',
        version: '2023',
        price_per_day: 120.50,
        fuel_usage: 8.2,
        fuel_type: 'Diesel',
        engine_name: '3.0L Turbo',
        power: 282,
        acceleration: 6.1,
        max_speed: 250,
        gearbox_type: 'Automatic',
        body_type: 'SUV',
        production_year: 2023,
        information: 'Luxury SUV with advanced features.'
    },
    {
        slug: 'audi-a4-2021',
        name: 'Audi A4',
        image: '/images/audi_a4.jpg',
        color: 'White',
        brand: 'Audi',
        model: 'A4',
        version: '2021',
        price_per_day: 90.00,
        fuel_usage: 7.0,
        fuel_type: 'Petrol',
        engine_name: '2.0L TFSI',
        power: 201,
        acceleration: 7.1,
        max_speed: 240,
        gearbox_type: 'Automatic',
        body_type: 'Sedan',
        production_year: 2021,
        information: 'Comfortable and stylish executive sedan.'
    }
];

const dummyUsers = [
    {
        username: 'adminUser',
        password: 'admin123',
        email: 'admin@example.com',
        role: 'admin'
    },
    {
        username: 'clientUser',
        password: 'client123',
        email: 'client@example.com',
        role: 'client'
    }
];

db.prepare(`
   CREATE TABLE IF NOT EXISTS cars (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
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
   )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL
    )
`).run();

function initData() {
    const carStmt = db.prepare(`
      INSERT INTO cars VALUES (
         null, @slug, @name, @image, @color, @brand, @model, @version, @price_per_day,
         @fuel_usage, @fuel_type, @engine_name, @power, @acceleration, @max_speed,
         @gearbox_type, @body_type, @production_year, @information
      )
    `);

    for (const car of dummyCars) {
        carStmt.run(car);
    }

    const userStmt = db.prepare(`
      INSERT INTO users VALUES (
         null, @username, @password, @email, @role
      )
    `);

    for (const user of dummyUsers) {
        userStmt.run(user);
    }
}

initData();