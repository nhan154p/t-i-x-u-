# 🎲 TÀI XỈU LIVE - Hướng dẫn chia sẻ cho bạn bè

## 🚀 Khởi động server công khai

### Trên Windows:
1. Double-click file: `run-server.bat`
2. Xem dòng "LAN: http://..." trong console
3. Copy link đó gửi cho bạn bè

### Trên Mac/Linux:
```bash
bash run-server.sh
```

### Hoặc dùng Python (không cần Node.js):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

---

## 🌐 Tìm địa chỉ IP máy tính

### Windows:
```cmd
ipconfig
```
Tìm dòng "IPv4 Address" → ví dụ: `192.168.1.100`

### Mac/Linux:
```bash
ifconfig
# hoặc
hostname -I
```

---

## 🔗 Chia sẻ link

Sau khi server chạy, link sẽ là:
