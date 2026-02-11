const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'projects.db');

// Create data directory if it doesn't exist
const fs = require('fs');
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

// Create projects table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      clientName TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('active', 'on_hold', 'completed')),
      startDate TEXT NOT NULL,
      endDate TEXT,
      createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deletedAt TEXT DEFAULT NULL
    )
  `);

  // Create index for better query performance
  db.run('CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status)');
  db.run('CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(createdAt)');
  db.run('CREATE INDEX IF NOT EXISTS idx_projects_start_date ON projects(startDate)');
  db.run('CREATE INDEX IF NOT EXISTS idx_projects_deleted_at ON projects(deletedAt)');

  console.log('Database initialized successfully');
});

db.close();
