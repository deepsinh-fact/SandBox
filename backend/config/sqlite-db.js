const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database file path
const dbPath = path.join(__dirname, '../database.sqlite');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database successfully!');
        
        // Create clients table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT,
            phone TEXT,
            address TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating clients table:', err.message);
            } else {
                console.log('Clients table ready');
            }
        });
    }
});

module.exports = { db };