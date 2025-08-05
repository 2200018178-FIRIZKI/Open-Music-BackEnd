@echo off
echo ================================================
echo OpenMusic API Debug Script
echo ================================================
echo.

cd /d "e:\15. Dicoding Elit BackEnd(2)\OpenMusic-main"

echo Current directory: %CD%
echo.

echo Testing Node.js...
node --version
echo.

echo Testing basic server...
node debug-server.js
echo.

echo ================================================
pause
