<!-- filepath: c:\Users\DELL LATITUDE 7490\OneDrive\Documents\web tx\quick-push.bat -->
@echo off
chcp 65001 >nul
color 0A
title Quick Push to GitHub

cd /d "%~dp0"

cls
echo.
echo 📤 QUICK PUSH...
echo.

git add .
git commit -m "Update code"
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo ❌ Lỗi!
    pause
    exit /b
)

echo.
echo ✅ Push thành công!
echo    https://github.com/nhan154p/t-i-x-u-
echo.