# UserHub - Hệ Thống Xác Thực Full Stack

Ứng dụng web full-stack hiện đại với hệ thống xác thực người dùng, giao diện Material UI đẹp mắt và API backend bảo mật.

**Sinh viên thực hiện:** Lê Thành Công

## Tính Năng

- **Xác Thực Người Dùng**: Hệ thống đăng ký và đăng nhập bảo mật
- **Giao Diện Đẹp**: Thiết kế gradient hiện đại với các thành phần và animation Material UI
- **Bảo Vệ Route**: Các route được bảo vệ cho người dùng đã xác thực
- **Xác Thực Thời Gian Thực**: Xác thực form với React Hook Form
- **Thiết Kế Responsive**: Hoạt động mượt mà trên mọi thiết bị
- **Backend Bảo Mật**: NestJS API với TypeORM và PostgreSQL

## Yêu Cầu Hệ Thống

Trước khi chạy project, vui lòng cài đặt các phần mềm sau:

- **Node.js** (phiên bản 18 trở lên)
  - Tải tại: https://nodejs.org/
  - Khuyến nghị: Phiên bản LTS (Long Term Support)
- **npm** (phiên bản 9 trở lên)
  - Được cài đặt tự động cùng Node.js
- **PostgreSQL** (phiên bản 14 trở lên)
  - Tải tại: https://www.postgresql.org/download/
  - Lưu ý: Ghi nhớ username và password khi cài đặt

## Cài Đặt & Thiết Lập

### Lưu Ý Quan Trọng

Dự án này đã bao gồm **đầy đủ source code và file cấu hình** (`.env`). Nên sẽ có 2 cách để chạy:

**Cách 1: Sử dụng cấu hình có sẵn (Nhanh nhất)**

- Sử dụng file `.env` đã có trong project
- Chỉ cần cài dependencies và chạy
- **Bỏ qua bước thiết lập database**

**Cách 2: Tự cấu hình database riêng**

- Tạo database PostgreSQL mới
- Chỉnh sửa file `.env` các thông tin liên quan database
- Xóa migration cũ và tạo và chạy migration mới để tạo bảng trong database

---

### Cách 1: Sử dụng Cấu Hình Có Sẵn (Khuyến Nghị)

Nếu chạy nhanh với file `.env` có sẵn, làm theo các bước sau:

#### Bước 1: Cài đặt Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Khởi động backend server
npm run start:dev
```

✅ Backend sẽ chạy tại: **http://localhost:9999**

#### Bước 2: Cài đặt Frontend

Mở **cửa sổ terminal mới** (giữ nguyên terminal backend đang chạy):

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies
npm install

# Khởi động frontend development server
npm run dev
```

✅ Frontend sẽ chạy tại: **http://localhost:5173**

**Mở trình duyệt và truy cập http://localhost:5173 để sử dụng ứng dụng.**

---

### Cách 2: Tự Cấu Hình Database Riêng

Nếu muốn sử dụng database PostgreSQL riêng của mình:

#### Bước 1: Tạo Database Mới

1. Mở PostgreSQL (pgAdmin hoặc command line)
2. Tạo database mới:

```sql
CREATE DATABASE userhub_db;
```

**Có thể sử dụng Database cloud thay cho database chạy trên local**

#### Bước 2: Cấu Hình Backend

1. Mở file `backend/.env`
2. Thay đổi thông tin database:

```env
# Thay đổi các giá trị sau theo database đã được tạo
DB_HOST=[your-database-host]
DB_PORT=[YOUR-PORT]
DB_USER=[YOUR-USERNAME]
DB_PASS=[YOUR-PASSWORD]
DB_NAME=[YOUR-DB-NAME]

# Giữ nguyên các cấu hình khác
DB_TYPE=postgres
PORT=9999
API_KEY=your_secure_api_key_here
```

#### Bước 3: Xóa Migration Cũ và Tạo Migration Mới

```bash
cd backend

# Cài đặt dependencies
npm install

# Xóa các file migration cũ trong thư mục src/migrations
# (Có thể xóa thủ công hoặc dùng lệnh)

# Tạo migration mới
npm run migration:generate -- src/migrations/init

# Chạy migration để tạo bảng
npm run migration:run

# Khởi động backend
npm run start:dev
```

#### Bước 4: Cấu Hình Frontend

1. Mở file `frontend/.env`
2. Đảm bảo `VITE_API_KEY` khớp với `API_KEY` trong `backend/.env`:

```env
VITE_API_URL=http://localhost:9999
VITE_API_KEY=your_secure_api_key_here  # Phải giống với API_KEY trong backend
```

3. Chạy frontend:

```bash
cd frontend
npm install
npm run dev
```

### Lưu Ý Khi Thay Đổi Database

- **Xóa migration cũ**: File trong `backend/src/migrations/` cần được xóa trước khi tạo migration mới
- **API Key phải khớp**: `VITE_API_KEY` (frontend) = `API_KEY` (backend)
- **Port phải trống**: Port 9999 (backend) và 5173 (frontend) không được sử dụng bởi ứng dụng khác
- **PostgreSQL phải chạy**: Đảm bảo PostgreSQL service đang hoạt động

## Các Scripts Có Sẵn

### Backend

```bash
npm run start:dev    # Khởi động development server với hot reload
npm run build        # Build cho production
npm run start        # Khởi động production server
npm run migration:run    # Chạy database migrations
npm run migration:revert # Hoàn tác migration gần nhất
```

### Frontend

```bash
npm run dev          # Khởi động development server
npm run build        # Build cho production
npm run preview      # Xem trước production build
npm run lint         # Chạy ESLint
```

## API Endpoints

### Xác Thực

- **POST** `/api/v1/users/register` - Đăng ký người dùng mới

  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```

- **POST** `/api/v1/users/login` - Đăng nhập người dùng
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

Tất cả requests yêu cầu header `x-api-key` với API key của bạn.
