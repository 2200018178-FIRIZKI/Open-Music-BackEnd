# OpenMusic API - Quick Start Guide

## Cara Menjalankan Server

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database (PostgreSQL)
Pastikan PostgreSQL sudah terinstall dan running, kemudian:
```bash
# Buat database
createdb openmusic

# Jalankan migration
npm run migrate up
```

### 3. Setup Environment Variables
File `.env` sudah dibuat dengan konfigurasi default:
```
HOST=localhost
PORT=5000
PGUSER=postgres
PGHOST=localhost
PGPASSWORD=password
PGDATABASE=openmusic
PGPORT=5432
```

### 4. Jalankan Server
```bash
# Development mode
npm run start-dev

# Production mode
node src/server.js
```

## Testing API

### Manual Testing
1. Jalankan server: `node src/server.js`
2. Buka browser: `http://localhost:5000`
3. Test endpoints:
   - `GET /` - Root endpoint
   - `GET /albums` - Get all albums
   - `POST /albums` - Create album
   - `GET /songs` - Get all songs
   - `POST /songs` - Create song

### Automated Testing
```bash
# Start server di terminal pertama
node src/server.js

# Di terminal kedua, jalankan test
node test-api.js
```

## API Endpoints

### Albums
- `POST /albums` - Create new album
- `GET /albums/{id}` - Get album by ID
- `PUT /albums/{id}` - Update album
- `DELETE /albums/{id}` - Delete album

### Songs
- `POST /songs` - Create new song
- `GET /songs` - Get all songs (with optional query params)
- `GET /songs/{id}` - Get song by ID
- `PUT /songs/{id}` - Update song
- `DELETE /songs/{id}` - Delete song

## Error Fixed

1. **Typo di routes**: `routs` → `routes`
2. **Typo di mapping**: `updateAt` → `updatedAt`
3. **Error message**: "Catatan tidak ditemukan" → "Lagu tidak ditemukan"
4. **Added default values** untuk PORT dan HOST
5. **Added error handling** untuk server startup
6. **Added root endpoint** untuk testing

## Troubleshooting

### Error 404 Not Found
- Pastikan server running di port 5000
- Check endpoint URL yang benar
- Pastikan database terkoneksi

### Database Connection Error
- Pastikan PostgreSQL running
- Check kredensial di file .env
- Pastikan database 'openmusic' sudah dibuat

### PowerShell Execution Policy Error
- Jalankan: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Atau gunakan: `node src/server.js` langsung
