<!-- filepath: c:\Users\DELL LATITUDE 7490\OneDrive\Documents\web tx\init-repo.bat -->
@echo off
chcp 65001 >nul
color 0A
title Initialize GitHub Repository

cd /d "%~dp0"

cls
echo.
echo ╔═══════════════════════════════════════════╗
echo ║  🚀 INIT GITHUB REPOSITORY                ║
echo ╚═══════════════════════════════════════════╝
echo.

git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git chưa cài đặt!
    pause
    exit /b
)

echo ✅ Git được tìm thấy
echo.

REM Xóa folder .git cũ nếu có
if exist ".git" (
    echo 🗑️  Xóa repository cũ...
    rmdir /s /q .git
    echo ✅ Xóa xong
    echo.
)

echo 🔧 Khởi tạo repository mới...
git init
git config user.name "Developer"
git config user.email "dev@example.com"
echo ✅ Init xong

echo.
echo 📋 Thêm tất cả files...
git add .
echo ✅ Add xong

echo.
echo 💬 Commit lần đầu...
git commit -m "Initial commit - Tai Xiu Live Casino Game"
echo ✅ Commit xong

echo.
echo 🌐 Thiết lập remote...
git remote add origin https://github.com/nhan154p/t-i-x-u-.git
git branch -M main
echo ✅ Remote đã thêm

echo.
echo 🚀 Push lên GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ Lỗi push!
    echo.
    echo 💡 Có thể cần:
    echo    1. Kiểm tra link repository: 
    echo       https://github.com/nhan154p/t-i-x-u-
    echo    2. Nhập GitHub credentials (username + token)
    echo.
    pause
    exit /b
)

echo.
echo ╔═══════════════════════════════════════════╗
echo ║  ✅ INIT THÀNH CÔNG!                      ║
echo ╚═══════════════════════════════════════════╝
echo.
echo 🌐 Repository: https://github.com/nhan154p/t-i-x-u-
echo.
pause