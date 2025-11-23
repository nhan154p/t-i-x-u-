# 🚀 Deploy Tài Xỉu Live lên Netlify

## ✨ Ưu điểm Netlify

✅ Miễn phí  
✅ Tự động deploy từ GitHub  
✅ HTTPS bảo mật  
✅ Domain miễn phí (.netlify.app)  
✅ CDN toàn cầu  
✅ Tốc độ nhanh  

---

## 📋 Bước 1: Tạo tài khoản Netlify

1. Vào: https://app.netlify.com/signup
2. Chọn **Sign up with GitHub**
3. Authorize Netlify
4. ✅ Tài khoản tạo xong

---

## 🔗 Bước 2: Connect GitHub Repository

1. Vào: https://app.netlify.com
2. Click **Add new site**
3. Chọn **Import an existing project**
4. Chọn **GitHub**
5. Tìm & chọn: `t-i-x-u-`
6. Click **Deploy site**

---

## ⏳ Bước 3: Chờ Deploy

- Netlify tự động build & deploy
- ~30 giây là xong
- Nhận link: `https://[name].netlify.app`

---

## 🎯 Bước 4: Cấu hình tên domain

### Cách 1: Dùng domain mặc định
- Link mặc định: `https://tai-xiu-live.netlify.app`
- Không cần config gì

### Cách 2: Dùng custom domain (tùy chọn)
1. Vào **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Nhập domain của bạn (ví dụ: `taixiulive.com`)
4. Theo hướng dẫn DNS
5. ✅ Domain thiết lập xong

---

## 🔄 Auto Deploy từ GitHub

Mỗi khi push code:
```bash
git add .
git commit -m "Update"
git push origin main
```

Netlify **tự động deploy**! ✅

---

## 🖥️ Local Development

Test trước khi push:

```bash
cd C:\Users\DELL LATITUDE 7490\OneDrive\Documents\web tx

python -m http.server 8000
```

Mở: `http://localhost:8000`

---

## 🔧 Build Settings

Mặc định Netlify tự detect & deploy.

Nếu cần custom, sửa `netlify.toml`:

```toml
[build]
  command = "echo 'No build needed'"
  publish = "."

[dev]
  command = "python -m http.server 8000"
  port = 8000
```

---

## 📊 Monitor Deploy

Vào: https://app.netlify.com
- Xem deploy log
- Kiểm tra status
- Rollback version cũ

---

## 🐛 Troubleshooting

### "Build failed"
✅ Kiểm tra logs → Fix lỗi → Push lại

### "Page not found"
✅ Kiểm tra `netlify.toml` → Thêm redirect

### "Slow loading"
✅ Kiểm tra file size → Optimize images

---

## 💡 Tips

### Share URL
Gửi cho bạn bè:
