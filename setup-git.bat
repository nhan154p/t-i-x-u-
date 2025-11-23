<!-- filepath: c:\Users\DELL LATITUDE 7490\OneDrive\Documents\web tx\setup-git.bat -->
@echo off
chcp 65001 >nul
color 0A
title Setup Git Repository

cd /d "%~dp0"

cls
echo.
echo ╔═══════════════════════════════════════════╗
echo ║  ⚙️  THIẾT LẬP GIT REPOSITORY             ║
echo ╚═══════════════════════════════════════════╝
echo.

git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git chưa được cài đặt!
    echo.
    echo 💡 Cài Git từ: https://git-scm.com/download/win
    pause
    exit /b
)

echo ✅ Git được tìm thấy
echo.

if exist ".git" (
    echo ✅ Repository đã tồn tại
    echo.
    git remote -v
    echo.
    pause
    exit /b
)

echo 🔧 Khởi tạo repository...
git init
echo ✅ Init xong

echo.
echo 📋 Cấu hình Git:
set /p USERNAME="   Nhập GitHub username: "
set /p EMAIL="   Nhập email GitHub: "

git config user.name "%USERNAME%"
git config user.email "%EMAIL%"
echo ✅ Config xong

echo.
echo 🌐 Thêm remote repository...
git remote add origin https://github.com/nhan154p/t-i-x-u-.git
echo ✅ Remote đã thêm

echo.
echo 📤 Commit lần đầu...
git add .
git commit -m "Initial commit - Tai Xiu Live Casino Game"
git branch -M main
echo ✅ Commit xong

echo.
echo ╔═══════════════════════════════════════════╗
echo ║  ✅ SETUP THÀNH CÔNG!                     ║
echo ╚═══════════════════════════════════════════╝
echo.
echo 💡 Tiếp theo:
echo    1. Double-click: push-github.bat
echo    2. Nhập GitHub credentials (nếu cần)
echo.
pause