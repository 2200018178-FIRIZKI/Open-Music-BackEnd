# 🚨 OpenMusic API Error Resolution Guide

## Masalah yang Ditemukan:

1. **404 Error** pada semua endpoint → Server/routing issue
2. **500 Error** pada songs → Database connection issue

## Langkah Penyelesaian:

### Step 1: Setup Database
```bash
# 1. Install PostgreSQL (jika belum)
# 2. Buat database
createdb openmusic

# 3. Jalankan migrations
cd "e:\15. Dicoding Elit BackEnd(2)\OpenMusic-main"
npm run migrate up
```

### Step 2: Verifikasi Database Connection
```bash
# Test database connection
node test-db.js
```

### Step 3: Jalankan Server dengan Debug
```bash
# Option 1: Original server
node src/server.js

# Option 2: Debug server (jika ada masalah)
node debug-server.js

# Option 3: Mock server (tanpa database)
node mock-server.js
```

### Step 4: Test Endpoints
```bash
# Di terminal terpisah
node test-api.js

# Atau manual test:
# curl http://localhost:5000/
# curl http://localhost:5000/albums
# curl http://localhost:5000/songs
```

## Jika Database Belum Ada:

### Quick Fix - Buat Database Manual:
1. Buka Command Prompt sebagai Administrator
2. Jalankan PostgreSQL command line:
   ```bash
   psql -U postgres
   CREATE DATABASE openmusic;
   \q
   ```

### Alternative - Gunakan Mock Server:
```bash
node mock-server.js
```
Mock server akan berjalan tanpa database untuk testing routing.

## Error Handling Ditambahkan:

1. ✅ **Better error logging** di server.js
2. ✅ **Database connection test** script
3. ✅ **Mock server** untuk testing tanpa database
4. ✅ **Debug script** untuk step-by-step troubleshooting

## Kemungkinan Penyebab Error:

### 404 Errors:
- Server tidak berjalan pada port 5000
- Routing configuration bermasalah
- Plugin registration gagal

### 500 Errors:
- Database PostgreSQL tidak running
- Database 'openmusic' tidak ada
- Connection credentials salah di .env
- Tables belum dibuat (belum migration)

## Solution Commands:

```bash
# Untuk Windows Command Prompt:

# 1. Setup database
createdb -U postgres openmusic

# 2. Set environment
set PGPASSWORD=your_password

# 3. Run migrations
npm run migrate up

# 4. Start server
node src/server.js

# 5. Test (di terminal baru)
node test-api.js
```

## Jika Masih Error:

1. **Cek apakah PostgreSQL service running**
2. **Verify database credentials** di .env
3. **Run debug.bat** untuk step-by-step checking
4. **Use mock-server.js** untuk isolate masalah database
