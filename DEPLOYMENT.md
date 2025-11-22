# 🚀 Hướng Dẫn Deploy UserHub

## 📋 Tổng Quan

Hướng dẫn này sẽ giúp bạn deploy:

- **Backend** (NestJS) lên Render.com hoặc Railway.app
- **Frontend** (React) lên Vercel hoặc Netlify
- **Database** (PostgreSQL) trên Railway hoặc Render

---

## 🗄️ Bước 1: Deploy Database (PostgreSQL)

### Option A: Railway.app (Khuyến nghị)

1. Truy cập [railway.app](https://railway.app)
2. Đăng nhập bằng GitHub
3. Click **New Project** → **Provision PostgreSQL**
4. Sau khi tạo xong, vào tab **Variables** để lấy thông tin:
   - `PGHOST`
   - `PGPORT`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`

### Option B: Render.com

1. Truy cập [render.com](https://render.com)
2. Click **New** → **PostgreSQL**
3. Chọn Free plan
4. Lưu lại các thông tin kết nối

---

## 🔧 Bước 2: Deploy Backend (NestJS)

### Option A: Render.com

1. **Tạo Web Service**

   - Truy cập [render.com](https://render.com)
   - Click **New** → **Web Service**
   - Kết nối GitHub repository của bạn
   - Chọn branch `master`

2. **Cấu hình Build Settings**

   ```
   Name: userhub-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install && npm run build
   Start Command: npm run start:prod
   ```

3. **Thêm Environment Variables**

   Vào tab **Environment** và thêm:

   ```env
   PORT=9999
   FRONTEND_URL=https://your-frontend-url.vercel.app

   DB_TYPE=postgres
   DB_HOST=<your-railway-host>
   DB_PORT=5432
   DB_USER=<your-railway-user>
   DB_PASS=<your-railway-password>
   DB_NAME=<your-railway-database>

   NODE_ENV=production
   ```

4. **Deploy**
   - Click **Create Web Service**
   - Chờ build và deploy (5-10 phút)
   - Lưu lại URL backend: `https://userhub-backend.onrender.com`

### Option B: Railway.app

1. **Tạo New Service**

   - Click **New Project** → **Deploy from GitHub repo**
   - Chọn repository `basic-user-fullstack`

2. **Cấu hình**

   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`

3. **Thêm Variables** (giống như Render)

4. **Generate Domain**
   - Vào Settings → Generate Domain
   - Lưu lại URL

---

## 💻 Bước 3: Deploy Frontend (React)

### Option A: Vercel (Khuyến nghị)

1. **Cài đặt Vercel CLI** (tùy chọn)

   ```bash
   npm install -g vercel
   ```

2. **Deploy qua GitHub**

   - Truy cập [vercel.com](https://vercel.com)
   - Click **Add New Project**
   - Import repository GitHub
   - Chọn branch `master`

3. **Cấu hình Build Settings**

   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Thêm Environment Variables**

   ```env
   VITE_API_URL=https://userhub-backend.onrender.com
   VITE_X_API_KEY=your-api-key-if-needed
   ```

5. **Deploy**
   - Click **Deploy**
   - Chờ 2-3 phút
   - Lưu lại URL: `https://your-app.vercel.app`

### Option B: Netlify

1. **Deploy qua Netlify**

   - Truy cập [netlify.com](https://netlify.com)
   - Click **Add new site** → **Import from Git**
   - Chọn repository

2. **Cấu hình**

   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

3. **Environment Variables**

   - Vào **Site settings** → **Environment variables**
   - Thêm `VITE_API_URL` với giá trị backend URL

4. **Deploy**

---

## 🔄 Bước 4: Chạy Migrations

Sau khi deploy backend, cần chạy migrations:

### Cách 1: Qua Render Dashboard

1. Vào Render Dashboard → Web Service
2. Tab **Shell**
3. Chạy lệnh:
   ```bash
   npm run migration:run
   ```

### Cách 2: Kết nối Database trực tiếp

1. Cài đặt PostgreSQL client
2. Kết nối đến database Railway/Render
3. Chạy migration từ local:
   ```bash
   cd backend
   npm run migration:run
   ```

---

## ✅ Bước 5: Cập nhật CORS

Sau khi có URL frontend, cập nhật lại backend:

1. **Cập nhật Environment Variables trên Render/Railway**

   ```env
   FRONTEND_URL=https://your-app.vercel.app
   ```

2. **Redeploy Backend** để áp dụng thay đổi

---

## 🧪 Bước 6: Test Production

1. **Truy cập Frontend URL**

   ```
   https://your-app.vercel.app
   ```

2. **Test các chức năng:**

   - ✅ Đăng ký tài khoản mới
   - ✅ Đăng nhập
   - ✅ Xem dashboard
   - ✅ Logout

3. **Kiểm tra Backend**
   ```
   https://userhub-backend.onrender.com/api/v1
   ```

---

## 📝 Checklist Deploy

- [ ] Database PostgreSQL đã tạo và kết nối thành công
- [ ] Backend deploy thành công và đang chạy
- [ ] Migration đã chạy xong
- [ ] Frontend deploy thành công
- [ ] Environment variables đã cấu hình đúng
- [ ] CORS đã được cập nhật
- [ ] Test đăng ký, đăng nhập hoạt động
- [ ] SSL/HTTPS đã được bật (tự động)

---

## 🔍 Troubleshooting

### Lỗi Database Connection

```bash
# Kiểm tra environment variables
# Đảm bảo DB_HOST, DB_PORT, DB_USER, DB_PASS đúng
```

### Lỗi CORS

```bash
# Cập nhật FRONTEND_URL trong backend .env
# Redeploy backend
```

### Migration Failed

```bash
# Xóa database cũ và tạo lại
# Chạy migration từ đầu
```

### Frontend không kết nối được Backend

```bash
# Kiểm tra VITE_API_URL
# Kiểm tra Network tab trong browser DevTools
# Đảm bảo backend đang chạy
```

---

## 🎯 Links Tham Khảo

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [NestJS Deployment](https://docs.nestjs.com/deployment)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

---

## 💡 Tips

1. **Free Tier Limitations:**

   - Render: Sleep sau 15 phút không hoạt động
   - Railway: 500 giờ/tháng
   - Vercel: Unlimited cho hobby projects

2. **Tối ưu Performance:**

   - Enable compression trên backend
   - Sử dụng CDN cho frontend
   - Cache API responses

3. **Monitoring:**

   - Dùng Render/Railway logs để debug
   - Vercel Analytics để theo dõi traffic
   - Setup error tracking (Sentry)

4. **Security:**
   - Luôn dùng HTTPS
   - Không commit .env vào git
   - Rotate API keys định kỳ

---

## 📧 Support

Nếu gặp vấn đề, check:

1. Logs trên Render/Railway/Vercel
2. Browser Console (F12)
3. Network tab để xem API requests

**Chúc bạn deploy thành công! 🎉**
