require('dotenv').config();
const Hapi = require('@hapi/hapi');

// song
const songs = require('./api/songs');
const SongsService = require('./services/postgres/song_service');
const SongsValidator = require('./validator/songs');

// album
const albums = require('./api/albums');
const AlbumsService = require('./services/postgres/album_service');
const AlbumsValidator = require('./validator/albums');

const init = async () => {
  try {
    console.log('🔧 Initializing services...');
    const songService = new SongsService();
    const albumService = new AlbumsService();
    
    console.log('🚀 Creating Hapi server...');
    const server = Hapi.server({
      port: process.env.PORT || 5000,
      host: process.env.HOST || 'localhost',
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });

    console.log('📦 Registering plugins...');
    await server.register(
      [
        {
          plugin: songs,
          options: {
            service: songService,
            validator: SongsValidator,
          },
        },
        {
          plugin: albums,
          options: {
            service: albumService,
            validator: AlbumsValidator,
          },
        },
      ],
    );

    // Add root route
    server.route({
      method: 'GET',
      path: '/',
      handler: () => ({
        message: 'OpenMusic API is running!',
        version: '1.0.0',
        endpoints: {
          albums: '/albums',
          songs: '/songs'
        }
      }),
    });

    console.log('🌟 Starting server...');
    await server.start();
    console.log(`✅ Server berjalan pada ${server.info.uri}`);
    
    // Log all registered routes
    console.log('📋 Registered routes:');
    server.table().forEach((route) => {
      console.log(`   ${route.method.toUpperCase()}  ${route.path}`);
    });
    
  } catch (error) {
    console.error('❌ Error during server initialization:', error);
    throw error;
  }
};

init().catch((error) => {
  console.error('Gagal menjalankan server:', error);
  process.exit(1);
});
