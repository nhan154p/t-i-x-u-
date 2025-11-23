<!-- filepath: c:\Users\DELL LATITUDE 7490\OneDrive\Documents\web tx\push-github.bat -->
@echo off
chcp 65001 >nul
color 0A
title Push Code to GitHub - Tai Xiu Live

cd /d "%~dp0"

cls
echo.
echo ╔═══════════════════════════════════════════╗
echo ║  📤 PUSH CODE LÊN GITHUB                  ║
echo ╚═══════════════════════════════════════════╝
echo.

REM Kiểm tra Git
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git chưa được cài đặt!
    echo.
    echo 💡 Cài Git từ: https://git-scm.com/download/win
    echo    Sau đó chạy lại file này
    echo.
    pause
    exit /b
)

echo ✅ Git được tìm thấy
echo.

REM Kiểm tra repo
if not exist ".git" (
    echo 🔧 Khởi tạo Git repository...
    git init
    echo.
)

echo 📋 Thêm tất cả files...
git add .
echo ✅ Xong

echo.
echo 💬 Nhập thông điệp commit:
set /p MESSAGE="   Mô tả thay đổi (mặc định: 'Update code'): "
if "%MESSAGE%"=="" set MESSAGE=Update code

echo.
echo 📝 Committing: %MESSAGE%
git commit -m "%MESSAGE%"
echo ✅ Xong

echo.
echo 🌐 Kiểm tra remote...
git remote -v >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Chưa thiết lập remote!
    echo.
    echo 💡 Thêm remote:
    git remote add origin https://github.com/nhan154p/t-i-x-u-.git
    echo ✅ Remote đã thêm
    echo.
)

echo 🚀 Push lên GitHub...
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ Lỗi push!
    echo.
    echo 💡 Có thể cần nhập credentials:
    echo    - Username: GitHub username của bạn
    echo    - Password: Personal Access Token
    echo.
    echo 📖 Hướng dẫn tạo token:
    echo    1. Vào: https://github.com/settings/tokens
    echo    2. Click "Generate new token"
    echo    3. Chọn scope "repo"
    echo    4. Copy token
    echo    5. Dán làm password ở trên
    echo.
    pause
    exit /b
)

echo.
echo ╔═══════════════════════════════════════════╗
echo ║  ✅ PUSH THÀNH CÔNG!                      ║
echo ╚═══════════════════════════════════════════╝
echo.
echo 🌐 Xem tại:
echo    https://github.com/nhan154p/t-i-x-u-
echo.
echo 📤 Share link cho bạn bè để clone!
echo.
pause