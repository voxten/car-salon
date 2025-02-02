const sql = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();



async function createAdmin() {
  const adminData = {
    username: process.env.ADMIN_USERNAME || 'admin',
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: process.env.ADMIN_PASSWORD || 'haslo123',
    role: 'admin'
  };

  // Sprawdź czy admin już istnieje
  const existingAdmin = db
    .prepare('SELECT * FROM users WHERE username = ? OR email = ?')
    .get(adminData.username, adminData.email);

  if (existingAdmin) {
    console.log('Admin account already exists!');
    return;
  }

  // Hashuj hasło
  const hashedPassword = await bcrypt.hash(adminData.password, 10);

  // Wstaw do bazy
  try {
    const stmt = db.prepare(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)'
    );
    stmt.run(
      adminData.username,
      adminData.email,
      hashedPassword,
      adminData.role
    );
    
    console.log('Admin account created successfully!');
    console.log('Credentials:');
    console.log(`Username: ${adminData.username}`);
    console.log(`Password: ${adminData.password}`);
  } catch (err) {
    console.error('Error creating admin:', err);
  }
}

createAdmin();