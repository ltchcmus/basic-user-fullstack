# 🚀 Quick Setup Guide - UserHub

## Prerequisites

- Node.js v18+
- PostgreSQL or MySQL database
- npm or yarn

---

## Step-by-Step Setup

### 1️⃣ Clone & Navigate

```bash
cd fullstack-basic
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Update with your database credentials

# Create database
# PostgreSQL: createdb userhub_db
# MySQL: CREATE DATABASE userhub_db;

# Run migrations
npm run migration:run

# Start backend server
npm run start:dev
```

Backend runs on: `http://localhost:9999`

### 3️⃣ Frontend Setup

Open a **new terminal**:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# .env file already configured
# VITE_API_URL=http://localhost:9999

# Start frontend server
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 🎉 Access the Application

Open your browser and go to:

```
http://localhost:5173
```

---

## 🧪 Test the Application

1. **Register a new user:**

   - Click "Get Started" or go to `/signup`
   - Enter email and password
   - Submit form
   - Should see success message and redirect to login

2. **Login:**

   - Go to `/login`
   - Enter your registered credentials
   - Submit form
   - Should redirect to dashboard

3. **View Dashboard:**
   - Should see your user information
   - Email, User ID, and creation date displayed

---

## ⚠️ Troubleshooting

### Backend Issues

- **Migration error:** Make sure database exists and credentials are correct
- **Port already in use:** Change PORT in backend `.env`
- **CORS error:** Verify FRONTEND_URL in backend `.env`

### Frontend Issues

- **API connection error:** Check if backend is running on port 9999
- **Build error:** Delete `node_modules` and run `npm install` again

### Database Issues

- **Connection refused:** Make sure PostgreSQL/MySQL is running
- **Authentication failed:** Check username/password in `.env`

---

## 📁 Important Files

### Backend

- `.env` - Environment configuration
- `src/main.ts` - Entry point
- `src/user/user.controller.ts` - API endpoints
- `src/user/user.service.ts` - Business logic

### Frontend

- `.env` - API URL configuration
- `src/App.jsx` - Main application
- `src/pages/` - All page components
- `src/services/api.js` - API client

---

## 🔑 Default Configuration

| Service     | URL                   | Port                             |
| ----------- | --------------------- | -------------------------------- |
| Backend API | http://localhost:9999 | 9999                             |
| Frontend    | http://localhost:5173 | 5173                             |
| Database    | localhost             | 5432 (PostgreSQL) / 3306 (MySQL) |

---

## 📚 Next Steps

1. ✅ Test registration and login
2. ✅ Explore the dashboard
3. ✅ Check the API responses in browser DevTools
4. ✅ Review the code structure
5. 🚀 Deploy to production (see main README.md)

---

## 💡 Quick Commands

```bash
# Backend
cd backend
npm run start:dev      # Development mode
npm run build          # Build for production
npm run start:prod     # Production mode

# Frontend
cd frontend
npm run dev            # Development mode
npm run build          # Build for production
npm run preview        # Preview production build
```

---

## 🆘 Need Help?

Check the detailed README.md in the root directory for:

- Full feature documentation
- API endpoint details
- Deployment guides
- Advanced configuration

---

**Ready to go! 🎊**
