console.log('🚀 Starting OpenMusic API...');
console.log('Current working directory:', process.cwd());

try {
  require('dotenv').config();
  console.log('✅ Environment variables loaded');
  
  const Hapi = require('@hapi/hapi');
  console.log('✅ Hapi.js loaded');
  
  // Test basic server creation
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
  });
  
  console.log('✅ Basic server created');
  
  // Add simple route
  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({ message: 'Hello World' }),
  });
  
  console.log('✅ Route added');
  
  // Start server
  server.start().then(() => {
    console.log('✅ Server started successfully at:', server.info.uri);
  }).catch(error => {
    console.error('❌ Server start failed:', error);
  });
  
} catch (error) {
  console.error('💥 Initialization failed:', error);
}
