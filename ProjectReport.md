# Project Report – 3D_Unity_Website

**Generated on:** 2026-11-06 10:32:00 +05:30

---

## 1. Project Overview
The **3D Unity** project is a full-stack, database-driven MERN architecture application (React 19 + TypeScript + Vite frontend with Express 5 + MongoDB + Cloudinary backend). It delivers a premium 3D printing e-commerce showcase, custom product ordering, quote requests, and an administrative suite for managing the dynamic catalog, categories, incoming inquiries, and site configuration.

---

## 2. Updated Directory Structure

```
3D_Unity_Website/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection with environment variable guard
│   ├── controllers/
│   │   ├── authController.js      # JWT login, register, me, logout handlers
│   │   ├── categoryController.js  # Category CRUD handlers
│   │   ├── dashboardController.js # Aggregated catalog & inquiry statistics
│   │   ├── inquiryController.js   # Inquiry creation, listing, status update
│   │   ├── productController.js   # Product CRUD + slug and ID query handlers
│   │   ├── settingsController.js  # Global website settings get/update
│   │   └── uploadController.js    # Cloudinary buffer upload stream
│   ├── middleware/
│   │   ├── auth.js                # JWT verification (header + cookie) & role guards
│   │   └── errorHandler.js        # 404 & centralized error handling
│   ├── models/
│   │   ├── Admin.js               # Admin schema with bcrypt hashing methods
│   │   ├── Category.js            # Category schema with slug pre-validation
│   │   ├── Inquiry.js             # Customer inquiry schema (product/custom/service)
│   │   ├── Product.js             # Product catalog schema with references & media
│   │   └── WebsiteSettings.js     # Contact, location, hours & delivery settings
│   ├── routes/
│   │   ├── auth.js                # /api/auth routes
│   │   ├── categories.js          # /api/categories routes
│   │   ├── dashboard.js           # /api/dashboard routes
│   │   ├── inquiries.js           # /api/inquiries routes
│   │   ├── products.js            # /api/products routes
│   │   ├── settings.js            # /api/settings routes
│   │   ├── sitemap.js             # /api/sitemap XML generator
│   │   └── upload.js              # /api/upload multipart image endpoint
│   ├── utils/
│   │   └── cloudinary.js          # Cloudinary v2 SDK configuration & helpers
│   ├── .env                       # Environment variables (DB, JWT, Cloudinary)
│   ├── package.json               # Backend dependencies (Express 5, Mongoose 9, Multer)
│   └── server.js                  # Main Express entry point with body parsers & routes
│
└── frontend/
    ├── public/                    # Static public assets
    ├── src/
    │   ├── assets/                # Logos and graphics
    │   ├── components/
    │   │   ├── icons.tsx          # SVG icon library
    │   │   ├── Layout.tsx         # Public website wrapper with TopBar, Nav & Footer
    │   │   ├── NavBar.tsx         # Main navigation with quote modal trigger
    │   │   ├── ProtectedRoute.tsx # Route guard with auth verification spinner
    │   │   ├── QuoteModal.tsx     # Custom 3D quote form connected to /api/inquiries
    │   │   ├── SEO.tsx            # Metadata tags
    │   │   ├── TopBar.tsx         # Notification & contact announcement bar
    │   │   └── WhatsAppButton.tsx # Floating WhatsApp floating contact button
    │   ├── context/
    │   │   └── AuthContext.tsx    # JWT-backed authentication state & session check
    │   ├── layouts/
    │   │   └── AdminLayout.tsx    # Admin sidebar navigation & workspace frame
    │   ├── pages/
    │   │   ├── admin/
    │   │   │   ├── AdminAddEditProduct.tsx # Add/Edit product with Cloudinary image upload
    │   │   │   ├── AdminCategories.tsx     # Real-time category management
    │   │   │   ├── AdminDashboard.tsx      # Database-driven metrics & inquiry table
    │   │   │   ├── AdminInquiries.tsx      # Inquiry management & WhatsApp routing
    │   │   │   ├── AdminLogin.tsx          # JWT login interface with error handling
    │   │   │   ├── AdminProducts.tsx       # Live product catalog table with delete
    │   │   │   └── AdminSettings.tsx       # Studio info & website configuration
    │   │   ├── Gallery/
    │   │   │   └── index.tsx      # Dynamic creation showcase loaded from products API
    │   │   ├── About.tsx          # About 3D Unity workshop & technologies
    │   │   ├── Contact.tsx        # Contact form with live submission to /api/inquiries
    │   │   ├── Home.tsx           # Landing page with interactive hero
    │   │   ├── NotFound.tsx       # 404 page
    │   │   ├── PrivacyPolicy.tsx  # Legal privacy document
    │   │   ├── Process.tsx        # 3D printing workflow & technologies
    │   │   ├── ProductDetails.tsx # Live product detail, specs & WhatsApp order CTA
    │   │   ├── Products.tsx       # Public catalog with category/price/material filters
    │   │   ├── Services.tsx       # 3D printing, prototyping & scanning services
    │   │   └── Terms.tsx          # Terms and conditions
    │   ├── services/
    │   │   └── api.ts             # Axios HTTP client with JWT interceptor & API modules
    │   ├── App.tsx                # Master client router & route definitions
    │   ├── main.tsx               # React 19 bootstrap entry point
    │   └── vite.config.ts         # Vite configuration with /api backend proxy
    └── package.json               # Frontend dependencies (React 19, Axios, Bootstrap 5)
```

---

## 3. Features – Comprehensive Status Matrix

| # | Feature / Module | Status | Technical Details |
|---|---|:---:|---|
| 1 | **Admin Route Guard** | ✅ | `ProtectedRoute.tsx` verifies JWT token on initial load with a visual spinner and redirects unauthenticated requests to `/admin/login`. |
| 2 | **Admin JWT Authentication** | ✅ | `AuthContext.tsx` integrates with `authAPI.login()` & `authAPI.getMe()`. Tokens and user state are saved in `localStorage` and sent with Bearer headers. |
| 3 | **Product Catalog CRUD** | ✅ | Full CRUD implemented in `AdminProducts.tsx` and `AdminAddEditProduct.tsx`. Supports both Add & Edit modes with `useParams` ID lookups (`GET /api/products/id/:id`). |
| 4 | **Cloudinary Image Upload** | ✅ | Image upload integrated into `AdminAddEditProduct.tsx` using `uploadAPI.upload()`. Uploads streams directly to Cloudinary folder `3dunity/products` via Multer buffer. |
| 5 | **Category Management** | ✅ | `AdminCategories.tsx` connects to `categoriesAPI.getAll()`, `create()`, and `delete()`. Auto-generates clean slugs. |
| 6 | **Dynamic Public Products** | ✅ | `Products.tsx` fetches live items from `productsAPI.getAll()` and categories from `categoriesAPI.getAll()`. Real-time multi-filter by price, material, and category slug. |
| 7 | **Dynamic Product Details** | ✅ | `ProductDetails.tsx` resolves dynamically by slug (`GET /api/products/:slug`), renders live images, specs, material, size selectors, and pre-filled WhatsApp order generator. |
| 8 | **Contact Form Integration** | ✅ | `Contact.tsx` connects to `inquiriesAPI.create()`, storing customer messages in MongoDB with validation feedback and WhatsApp fallback. |
| 9 | **Quote Modal Integration** | ✅ | `QuoteModal.tsx` submits custom 3D model inquiries to `POST /api/inquiries` and includes quick WhatsApp direct messaging. |
| 10 | **Admin Dashboard Metrics** | ✅ | `AdminDashboard.tsx` fetches real-time aggregate counts (products, categories, inquiries, new alerts) via `GET /api/dashboard/stats`. |
| 11 | **Customer Inquiry Management** | ✅ | `AdminInquiries.tsx` lists inquiries from database, supports real-time status updates (`new`, `contacted`, `in-progress`, `completed`, `closed`), and quick WhatsApp links. |
| 12 | **Dynamic Gallery Showcase** | ✅ | `Gallery/index.tsx` dynamically displays media items and angles derived from the live catalog, filterable by active categories with modal inspection. |
| 13 | **Website Settings Management** | ✅ | `AdminSettings.tsx` and `WebsiteSettings.js` model manage business details, contact numbers, hours, social links, and delivery charges. |
| 14 | **API Client & Request Interceptor** | ✅ | `src/services/api.ts` provides typed API helper objects with automatic Bearer token injection and 401 unauthenticated redirect handlers. |
| 15 | **Vite Proxy Configuration** | ✅ | `vite.config.ts` proxies `/api` calls directly to `http://localhost:5000` to prevent CORS issues in development. |
| 16 | **Production Build & Type Safety** | ✅ | Verified with `tsc -b && vite build` — compiles cleanly with 0 TypeScript or bundler errors. |

---

## 4. Backend Endpoints Summary

| Endpoint | Method | Access | Description |
|---|:---:|:---:|---|
| `/api/auth/register` | `POST` | Public | Register initial admin user |
| `/api/auth/login` | `POST` | Public | Authenticate admin & return JWT token |
| `/api/auth/me` | `GET` | Private | Verify admin session from Bearer token |
| `/api/auth/logout` | `POST` | Private | Admin sign out & cookie clear |
| `/api/products` | `GET` | Public | List all catalog products with populated category |
| `/api/products/:slug` | `GET` | Public | Get product details by SEO slug |
| `/api/products/id/:id` | `GET` | Public/Private | Get product by MongoDB `_id` for admin editing |
| `/api/products` | `POST` | Private/Admin | Create product with pricing, specs & media |
| `/api/products/:id` | `PUT` | Private/Admin | Update product details |
| `/api/products/:id` | `DELETE` | Private/Admin | Remove product from catalog |
| `/api/categories` | `GET` | Public | List all categories sorted alphabetically |
| `/api/categories` | `POST` | Private/Admin | Add new category |
| `/api/categories/:id` | `DELETE` | Private/Admin | Remove category |
| `/api/inquiries` | `POST` | Public | Submit contact message or quote request |
| `/api/inquiries` | `GET` | Private/Admin | List customer inquiries (newest first) |
| `/api/inquiries/:id/status` | `PUT` | Private/Admin | Update inquiry status and admin notes |
| `/api/dashboard/stats` | `GET` | Private/Admin | Aggregated counts & recent inquiry list |
| `/api/settings` | `GET` | Public | Get business settings & contact numbers |
| `/api/settings` | `PUT` | Private/Admin | Update business settings |
| `/api/upload` | `POST` | Private/Admin | Upload image file to Cloudinary |
| `/api/sitemap` | `GET` | Public | Generate XML sitemap with dynamic product slugs |
| `/api/health` | `GET` | Public | Health check route |

---

## 5. Next Steps for Production Deployment

1. **MongoDB Atlas Connection:**
   In `backend/.env`, replace the placeholder credentials in `MONGODB_URI` with your live MongoDB Atlas connection string.
2. **Cloudinary Media Credentials:**
   In `backend/.env`, set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` from your Cloudinary dashboard to enable live image uploads.
3. **Admin User Initialization:**
   Use `POST /api/auth/register` once or run an initial seed script to create your production admin credentials.
4. **Start Servers:**
   - Backend: `cd backend && npm run dev` (starts on port 5000)
   - Frontend: `cd frontend && npm run dev` (starts on port 5173 with automatic `/api` proxy)
