# Frontend - UserHub

React frontend for UserHub authentication system.

## Quick Start

### Install Dependencies

```bash
npm install
```

### Setup Environment

Create `.env` file:

```env
VITE_API_URL=http://localhost:9999
```

### Run Development Server

```bash
npm run dev
```

Application runs on `http://localhost:5173`

## Features

- 🎨 Material UI styling
- 📝 React Hook Form validation
- 🔄 React Query for API calls
- 🔐 Authentication context
- 🛡️ Protected routes
- 📱 Responsive design

## Pages

- **Home** (`/`) - Landing page
- **Sign Up** (`/signup`) - User registration
- **Login** (`/login`) - User authentication
- **Dashboard** (`/dashboard`) - User profile (protected)

## Technologies

- React 19
- Material UI
- React Router DOM
- React Hook Form
- React Query
- Axios
- Vite

## Project Structure

```
src/
├── pages/           # Page components
│   ├── Home.jsx
│   ├── SignUp.jsx
│   ├── Login.jsx
│   └── Dashboard.jsx
├── components/      # Reusable components
│   └── ProtectedRoute.jsx
├── context/         # React contexts
│   └── AuthContext.jsx
├── services/        # API services
│   └── api.js
├── App.jsx          # Main component
└── main.jsx         # Entry point
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: `http://localhost:9999`)

## Form Validation Rules

### Registration

- Email: Valid email format, required
- Password: 6-50 characters, required
- Confirm Password: Must match password

### Login

- Email: Valid email format, required
- Password: 6-50 characters, required

## API Integration

All API calls use React Query mutations for:

- Loading states
- Error handling
- Success feedback
- Optimistic updates
