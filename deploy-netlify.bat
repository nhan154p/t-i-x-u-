<!-- filepath: c:\Users\DELL LATITUDE 7490\OneDrive\Documents\web tx\deploy-netlify.bat -->
@echo off
chcp 65001 >nul
color 0A
title Deploy to Netlify - Tai Xiu Live

cd /d "%~dp0"

cls
echo.
echo ╔═══════════════════════════════════════════╗
echo ║  🚀 DEPLOY LÊN NETLIFY                    ║
echo ╚═══════════════════════════════════════════╝
echo.

REM Kiểm tra Netlify CLI
netlify --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Netlify CLI chưa được cài đặt!
    echo.
    echo 💡 Cài đặt:
    echo    npm install -g netlify-cli
    echo.
    echo Hoặc tải từ: https://www.netlify.com/products/cli/
    echo.
    pause
    exit /b
)

echo ✅ Netlify CLI được tìm thấy
echo.

REM Login Netlify
echo 🔐 Login Netlify (mở trình duyệt)...
netlify login

if errorlevel 1 (
    echo ❌ Login thất bại!
    pause
    exit /b
)

echo ✅ Login thành công
echo.

REM Deploy
echo 📤 Deploying...
echo.

netlify deploy --prod

if errorlevel 1 (
    echo.
    echo ❌ Deploy thất bại!
    pause
    exit /b
)

echo.
echo ╔═══════════════════════════════════════════╗
echo ║  ✅ DEPLOY THÀNH CÔNG!                    ║
echo ╚═══════════════════════════════════════════╝
echo.
echo 🌐 Xem tại: https://tai-xiu-live.netlify.app
echo.
pause