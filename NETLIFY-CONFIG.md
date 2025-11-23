# 🚀 Cấu hình Netlify Deploy

## 📋 Thông tin cấu hình

| Mục | Giá trị |
|-----|--------|
| **Team** | quizz |
| **Project Name** | t-i-x-u- (hoặc tên khác) |
| **Repository** | nhan154p/t-i-x-u- |
| **Branch** | main |
| **Base Directory** | . (root) |
| **Build Command** | echo 'No build needed' |
| **Publish Directory** | . (root) |
| **Functions Directory** | netlify/functions |

---

## 🔧 Build Settings

### Branch to deploy
✅ **main** (mặc định)

### Base directory
✅ **.** (root folder)
- Nơi Netlify bắt đầu build

### Build command
✅ **echo 'No build needed - static site'**
- Project này là static (không cần build)
- Nếu có JS bundler, dùng: `npm run build`

### Publish directory
✅ **.** (root folder)
- Nơi chứa files cần deploy (index.html, styles.css, v.v)

### Functions directory
✅ **netlify/functions**
- Nơi chứa Netlify Functions (serverless)
- Tạm thời không dùng

---

## 📝 Cách setup trên Netlify

### Bước 1: Vào Netlify
1. https://app.netlify.com
2. Login với GitHub

### Bước 2: Deploy
1. Click **Add new site**
2. Chọn **Import an existing project**
3. Chọn **GitHub**
4. Tìm **nhan154p/t-i-x-u-**
5. Click **Deploy site**

### Bước 3: Cấu hình
Netlify sẽ tự detect cấu hình từ `netlify.toml`

✅ Không cần config thêm!

---

## 🔄 Auto Deploy

Mỗi khi push code:
```bash
git add .
git commit -m "Update"
git push origin main
```

Netlify **tự động**:
1. ✅ Pull code từ GitHub
2. ✅ Chạy build command
3. ✅ Deploy lên server
4. ✅ Update live site

---

## 🌐 Kết quả

Sau deploy bạn sẽ có:

**Default URL:**
