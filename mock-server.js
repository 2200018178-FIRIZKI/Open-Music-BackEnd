require('dotenv').config();
const Hapi = require('@hapi/hapi');

// Mock services tanpa database
class MockSongsService {
  async addSong(data) {
    return 'mock-song-id';
  }
  
  async getSongs() {
    return [
      { id: 'song-1', title: 'Mock Song 1', performer: 'Mock Artist' }
    ];
  }
  
  async getSongById(id) {
    return { id, title: 'Mock Song', performer: 'Mock Artist' };
  }
  
  async editSongById(id, data) {
    return true;
  }
  
  async deleteSongById(id) {
    return true;
  }
}

class MockAlbumsService {
  async addAlbum(data) {
    return 'mock-album-id';
  }
  
  async getAlbumById(id) {
    return { 
      id, 
      name: 'Mock Album', 
      year: 2023,
      songs: []
    };
  }
  
  async editAlbumById(id, data) {
    return true;
  }
  
  async deleteAlbumById(id) {
    return true;
  }
}

// Import validators
const SongsValidator = require('./src/validator/songs');
const AlbumsValidator = require('./src/validator/albums');

// Import plugins
const songs = require('./src/api/songs');
const albums = require('./src/api/albums');

const init = async () => {
  try {
    console.log('🔧 Initializing mock services...');
    const songService = new MockSongsService();
    const albumService = new MockAlbumsService();
    
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

    console.log('📦 Registering plugins with mock services...');
    await server.register([
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
    ]);

    // Add root route
    server.route({
      method: 'GET',
      path: '/',
      handler: () => ({
        message: 'OpenMusic API is running! (Mock Mode)',
        version: '1.0.0',
        mode: 'mock',
        endpoints: {
          albums: '/albums',
          songs: '/songs'
        }
      }),
    });

    console.log('🌟 Starting server...');
    await server.start();
    console.log(`✅ Mock Server berjalan pada ${server.info.uri}`);
    
    // Log all registered routes
    console.log('📋 Registered routes:');
    server.table().forEach((route) => {
      console.log(`   ${route.method.toUpperCase()}  ${route.path}`);
    });
    
  } catch (error) {
    console.error('❌ Error during mock server initialization:', error);
    throw error;
  }
};

init().catch((error) => {
  console.error('💥 Gagal menjalankan mock server:', error);
  process.exit(1);
});
