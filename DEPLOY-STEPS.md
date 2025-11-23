# 📋 Hướng dẫn Deploy Step by Step

## 🎯 Mục tiêu
Deploy Tài Xỉu Live lên Netlify trên team **quizz**

---

## ✅ Bước 1: Chuẩn bị Code

### Kiểm tra code
```bash
cd C:\Users\DELL LATITUDE 7490\OneDrive\Documents\web tx

# Kiểm tra files quan trọng
ls -la index.html
ls -la styles.css
ls -la netlify.toml
```

### Push code lên GitHub
```bash
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

✅ Code đã lên GitHub

---

## ✅ Bước 2: Tạo tài khoản Netlify

### Nếu chưa có
1. Vào: https://app.netlify.com/signup
2. Chọn **Sign up with GitHub**
3. Authorize
4. ✅ Xong

### Nếu đã có
1. https://app.netlify.com
2. Login
3. ✅ Xong

---

## ✅ Bước 3: Deploy Site

### Tại Netlify Dashboard
1. Click **Add new site**
2. Chọn **Import an existing project**
3. Chọn **GitHub**
4. Tìm repository: `t-i-x-u-`
5. Click **Connect**

### Cấu hình Build Settings

#### Branch to deploy
- Giữ nguyên: **main**

#### Build settings
- **Base directory:** (trống - auto detect)
- **Build command:** (trống - auto detect hoặc `echo 'No build'`)
- **Publish directory:** (trống - auto detect)

*Netlify sẽ đọc `netlify.toml` tự động*

### Deploy
6. Click **Deploy site**
7. ⏳ Chờ deploy (1-2 phút)
8. ✅ Deploy xong!

---

## ✅ Bước 4: Kiểm tra Deploy

### Xem URL site
- Default: `https://[project-name].netlify.app`
- Ví dụ: `https://t-i-x-u-.netlify.app`

### Test site
1. Mở URL
2. Kiểm tra:
   - ✅ Page load?
   - ✅ Game chạy?
   - ✅ Button hoạt động?
   - ✅ Chat có?
   - ✅ Bảng xếp hạng có?

### Xem log
1. https://app.netlify.com
2. Chọn site
3. **Deploys** → **Latest deploy**
4. Xem build log

---

## ✅ Bước 5: Cấu hình Team

### Thêm vào Team
1. **Team overview** (top left)
2. Chọn team: **quizz**
3. **Sites** → **Add new site**
4. Chọn site vừa deploy
5. ✅ Site thêm vào team

---

## ✅ Bước 6: Custom Domain (Tùy chọn)

### Nếu muốn domain riêng

#### Có sẵn domain
1. Site settings → Domain management
2. Click **Add custom domain**
3. Nhập domain (ví dụ: `taixiulive.com`)
4. Theo hướng dẫn DNS

#### Mua domain từ Netlify
1. Domain management
2. Click **Register new domain**
3. Tìm & mua domain
4. ✅ Auto config DNS

---

## ✅ Bước 7: Enable HTTPS

### HTTPS (bảo mật)
✅ Tự động enable từ Netlify!

- ✅ SSL certificate auto
- ✅ Renew tự động
- ✅ Force HTTPS

---

## ✅ Bước 8: Cấu hình Auto Deploy

### Push code → Auto deploy

#### Kiểm tra setup
1. Site settings → Build & deploy
2. **Source:** GitHub
3. **Branch:** main
4. **Auto publish:** ✅ Enabled

### Thử auto deploy
1. Edit file local
2. Commit & push:
```bash
git add .
git commit -m "Test auto deploy"
git push origin main
```

3. Xem Netlify dashboard
4. ✅ Deploy tự động!

---

## 🎉 Hoàn thành!

Bây giờ bạn có:
- ✅ Site trên Netlify
- ✅ URL công khai
- ✅ HTTPS bảo mật
- ✅ Auto deploy từ GitHub
- ✅ Trong team quizz

---

## 📊 Monitoring

### Xem performance
1. **Analytics**
2. Xem traffic, bandwidth, errors

### Xem deploys
1. **Deploys**
2. Xem history & status

### Logs
1. **Logs** → **Build log**
2. Debug errors

---

## 🚀 Share URL

Gửi cho bạn bè:
