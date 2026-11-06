# 3D Unity — Full-Stack 3D Printing Business Website

**Business:** 3D Unity | Surat, Gujarat, India  
**Email:** 3duniti1@gmail.com | **Phone:** +91 88669 61005  
**Address:** 215 Apple Square, Yogi Chowk, Surat, Gujarat 395010

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript + Vite + Bootstrap 5 |
| Backend | Node.js + Express 5 + MongoDB (Mongoose) |
| Auth | JWT (jsonwebtoken) |
| Image Storage | Cloudinary |
| Styling | Custom CSS Design System + Bootstrap 5 |

---

## Project Structure

```
3D_Unity_Website/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Shared UI components
│   │   ├── context/       # React Context (Auth)
│   │   ├── data/          # Mock data (mockData.ts)
│   │   ├── layouts/       # Admin layout wrapper
│   │   ├── pages/         # All page components
│   │   │   └── admin/     # Admin panel pages
│   │   ├── services/      # Axios API service (api.ts)
│   │   └── styles/        # CSS design system (theme.css)
│   ├── .env.example
│   └── package.json
│
├── backend/           # Express + MongoDB backend
│   ├── config/        # Database connection
│   ├── controllers/   # Route handler logic
│   ├── middleware/    # Auth + error handling
│   ├── models/        # Mongoose schemas
│   ├── routes/        # Express routers
│   ├── utils/         # Cloudinary helper
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

## Quick Start

### 1. Clone & Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**Backend** — copy `.env.example` to `.env` and fill in your values:

```bash
cp backend/.env.example backend/.env
```

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/3dunity?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
PORT=5000
CORS_ORIGIN=http://localhost:5173

# Cloudinary (get from cloudinary.com dashboard)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend** — copy `.env.example` to `.env`:

```bash
cp frontend/.env.example frontend/.env
```

```env
VITE_API_URL=http://localhost:5000
VITE_WHATSAPP_NUMBER=918866961005
```

### 3. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev
# → Runs on http://localhost:5000

# Terminal 2 — Frontend
cd frontend
npm run dev
# → Runs on http://localhost:5173
```

---

## Admin Panel

Navigate to `http://localhost:5173/admin/login`

**Default Admin** — Register first via the API, or use the demo fallback (backend offline):
- Any email/password → creates a local demo session for UI testing

**To create an admin account:**
```bash
# POST http://localhost:5000/api/auth/register
{
  "name": "Admin",
  "email": "admin@3dunity.com",
  "password": "yourpassword"
}
```

---

## Public Pages

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/products` | Products Listing |
| `/products/:slug` | Product Details |
| `/services` | Our Services |
| `/process` | How It Works |
| `/gallery` | Gallery |
| `/contact` | Contact Us |
| `/privacy-policy` | Privacy Policy |
| `/terms` | Terms & Conditions |

## Admin Pages

| Path | Page |
|---|---|
| `/admin/login` | Admin Login |
| `/admin/dashboard` | Dashboard Overview |
| `/admin/products` | Product Management |
| `/admin/products/add` | Add Product |
| `/admin/products/edit/:id` | Edit Product |
| `/admin/categories` | Category Management |
| `/admin/inquiries` | Customer Inquiries |
| `/admin/settings` | Website Settings |

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register admin |
| POST | `/api/auth/login` | No | Login admin |
| GET | `/api/products` | No | List products |
| GET | `/api/products/:slug` | No | Get product |
| POST | `/api/products` | ✅ | Create product |
| PUT | `/api/products/:id` | ✅ | Update product |
| DELETE | `/api/products/:id` | ✅ | Delete product |
| GET | `/api/categories` | No | List categories |
| POST | `/api/categories` | ✅ | Create category |
| DELETE | `/api/categories/:id` | ✅ | Delete category |
| POST | `/api/inquiries` | No | Submit inquiry |
| GET | `/api/inquiries` | ✅ | List inquiries |
| PUT | `/api/inquiries/:id` | ✅ | Update inquiry status |
| GET | `/api/settings` | No | Get site settings |
| PUT | `/api/settings` | ✅ | Update settings |
| GET | `/api/dashboard/stats` | ✅ | Dashboard stats |
| POST | `/api/upload` | ✅ | Upload image to Cloudinary |
| GET | `/api/sitemap` | No | XML sitemap |
| GET | `/api/health` | No | Health check |

---

## Production Build

```bash
cd frontend
npm run build
# Output in frontend/dist/ — deploy to Vercel, Netlify, etc.
```

---

## Notes

- No shopping cart or payment gateway — inquiry/WhatsApp only
- Images stored on Cloudinary (free tier: 25 GB storage)
- WhatsApp Business integration via direct wa.me links
- Pan India delivery supported

