<!-- filepath: c:\Users\DELL LATITUDE 7490\OneDrive\Documents\web tx\pull-github.bat -->
@echo off
chcp 65001 >nul
color 0A
title Pull Code from GitHub

cd /d "%~dp0"

cls
echo.
echo ╔═══════════════════════════════════════════╗
echo ║  📥 LẤY CODE TỪ GITHUB                    ║
echo ╚═══════════════════════════════════════════╝
echo.

git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git chưa được cài đặt!
    pause
    exit /b
)

echo ✅ Git được tìm thấy
echo.
echo 🔄 Lấy code từ GitHub...
echo.

git pull origin main

if errorlevel 1 (
    echo.
    echo ❌ Lỗi pull!
    pause
    exit /b
)

echo.
echo ╔═══════════════════════════════════════════╗
echo ║  ✅ PULL THÀNH CÔNG!                      ║
echo ╚═══════════════════════════════════════════╝
echo.
pause