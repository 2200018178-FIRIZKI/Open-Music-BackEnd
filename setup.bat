@echo off
cls
echo ================================================
echo         OpenMusic API Setup Script
echo ================================================
echo.

cd /d "e:\15. Dicoding Elit BackEnd(2)\OpenMusic-main"

echo 📍 Current directory: %CD%
echo.

echo 🔍 Step 1: Testing Node.js installation...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js first.
    pause
    exit /b 1
)
echo ✅ Node.js is installed
echo.

echo 🔍 Step 2: Testing database connection...
echo (This will show if PostgreSQL is running and accessible)
node test-db.js
echo.

echo 🔍 Step 3: Attempting to create tables...
node create-tables.js
echo.

echo 🚀 Step 4: Starting server...
echo (Press Ctrl+C to stop the server)
echo.
node src/server.js

pause
