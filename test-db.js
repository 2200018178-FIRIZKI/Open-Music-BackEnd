require('dotenv').config();
const { Pool } = require('pg');

async function testDatabaseConnection() {
  console.log('🔌 Testing database connection...');
  console.log('Database config:');
  console.log(`  Host: ${process.env.PGHOST}`);
  console.log(`  Port: ${process.env.PGPORT}`);
  console.log(`  Database: ${process.env.PGDATABASE}`);
  console.log(`  User: ${process.env.PGUSER}`);
  
  const pool = new Pool();
  
  try {
    const client = await pool.connect();
    console.log('✅ Database connection successful!');
    
    // Test query
    const result = await client.query('SELECT NOW()');
    console.log('📅 Database time:', result.rows[0].now);
    
    // Check if tables exist
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('📋 Available tables:');
    if (tablesResult.rows.length === 0) {
      console.log('   ⚠️  No tables found! Run migrations first.');
    } else {
      tablesResult.rows.forEach(row => {
        console.log(`   - ${row.table_name}`);
      });
    }
    
    client.release();
    await pool.end();
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Solutions:');
      console.log('1. Make sure PostgreSQL is running');
      console.log('2. Check if the database "openmusic" exists');
      console.log('3. Verify database credentials in .env file');
    } else if (error.code === '3D000') {
      console.log('\n💡 Database does not exist. Create it with:');
      console.log('   createdb openmusic');
    }
    
    process.exit(1);
  }
}

testDatabaseConnection();
