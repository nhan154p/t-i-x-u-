@echo off
chcp 65001 >nul
color 0A
title TÀI XỈU LIVE - Server Công Khai

cd /d "%~dp0"

cls
echo.
echo ╔═══════════════════════════════════════════╗
echo ║  🎲 TÀI XỈU LIVE - SERVER CÔNG KHAI      ║
echo ╚═══════════════════════════════════════════╝
echo.

python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python chưa được cài đặt!
    echo.
    echo 💡 Cài Python từ: https://python.org
    echo    Sau đó chạy lại file này
    echo.
    pause
    exit /b
)

echo ✅ Python được tìm thấy
echo.
echo 🚀 Khởi động server...
echo.
echo 📍 Truy cập cục bộ: http://localhost:8000
echo.
echo 🌐 Chia sẻ cho bạn bè:
echo    Mở CMD: ipconfig (tìm IPv4 Address)
echo    Sau đó gửi: http://[IP-của-bạn]:8000
echo.
echo ⚠️  Để dừng: Nhấn Ctrl+C
echo.

python -m http.server 8000

if errorlevel 1 (
    echo.
    echo ❌ Lỗi!
    pause
)