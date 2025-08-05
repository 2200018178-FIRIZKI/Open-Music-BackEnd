require('dotenv').config();
const { Pool } = require('pg');

async function createTablesManually() {
  console.log('🔧 Creating tables manually...');
  
  const pool = new Pool();
  
  try {
    const client = await pool.connect();
    
    // Create albums table
    console.log('📊 Creating albums table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS albums (
        id VARCHAR(50) PRIMARY KEY,
        name TEXT NOT NULL,
        year INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `);
    
    // Create songs table
    console.log('🎵 Creating songs table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS songs (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        year INTEGER NOT NULL,
        performer VARCHAR(100) NOT NULL,
        genre VARCHAR(50) NOT NULL,
        duration INTEGER,
        album_id VARCHAR(50),
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
      )
    `);
    
    // Create index
    console.log('📝 Creating index...');
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_songs_album_id ON songs(album_id)
    `);
    
    console.log('✅ All tables created successfully!');
    
    client.release();
    await pool.end();
    
  } catch (error) {
    console.error('❌ Failed to create tables:', error.message);
    process.exit(1);
  }
}

createTablesManually();
