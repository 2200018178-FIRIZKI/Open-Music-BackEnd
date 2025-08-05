require('dotenv').config();
const Hapi = require('@hapi/hapi');

const init = async () => {
  try {
    const server = Hapi.server({
      port: process.env.PORT || 5000,
      host: process.env.HOST || 'localhost',
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });

    // Add simple test routes without database
    server.route({
      method: 'GET',
      path: '/',
      handler: () => ({
        message: 'OpenMusic API is running!',
        version: '1.0.0',
        status: 'Server OK',
        timestamp: new Date().toISOString()
      }),
    });

    server.route({
      method: 'GET',
      path: '/test',
      handler: () => ({
        message: 'Test endpoint working',
        server: 'Hapi.js',
        database: 'PostgreSQL (not connected in this test)'
      }),
    });

    // Simple albums endpoint for testing
    server.route({
      method: 'GET',
      path: '/albums',
      handler: () => ({
        status: 'success',
        message: 'Albums endpoint (test mode)',
        data: {
          albums: []
        }
      }),
    });

    // Simple songs endpoint for testing
    server.route({
      method: 'GET',
      path: '/songs',
      handler: () => ({
        status: 'success',
        message: 'Songs endpoint (test mode)',
        data: {
          songs: []
        }
      }),
    });

    await server.start();
    console.log(`🚀 Test Server berjalan pada ${server.info.uri}`);
    console.log('📋 Available test endpoints:');
    console.log('   GET  /       - Root endpoint');
    console.log('   GET  /test   - Test endpoint');
    console.log('   GET  /albums - Albums test endpoint');
    console.log('   GET  /songs  - Songs test endpoint');
    
  } catch (error) {
    console.error('❌ Gagal menjalankan test server:', error);
    process.exit(1);
  }
};

init();
