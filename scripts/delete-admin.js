const sql = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(process.cwd(), 'car_salon.db');
const db = sql(dbPath);

try {
  // Usuń użytkowników, którzy mają rolę "admin"
  const stmt = db.prepare('DELETE FROM users WHERE role = ?');
  const result = stmt.run('admin');

  console.log(`Usunięto ${result.changes} rekord(ów) z roli admin.`);
} catch (err) {
  console.error('Błąd podczas usuwania admina:', err);
}
