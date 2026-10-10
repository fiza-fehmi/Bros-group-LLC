# Bros Group LLC Official Corporate Portal & Engineering Blueprint

This repository contains the complete, production-ready corporate web platform and functional backend API system for **Bros Group LLC** based on the official PDF Engineering Blueprint.

---

## 🚀 Key Features Implemented

1. **Global Components**:
   - **Sticky Navigation Bar**: Responsive header with active route highlights, smooth scroll backdrop, CTA button (*"Get in Touch"*), and accessible mobile drawer.
   - **Multi-Column Footer**: Company overview, Quick Links, Core Practices, contact details (`info@brosgroupllc.com`), physical address, and functional newsletter subscription form.

2. **Page Architecture (8 Full Pages)**:
   - **`/` (Home)**: Hero banner with dual CTAs, animated counter bar (20+ MOUs Signed, 1,800+ Happy Clients, 9 Global Sponsors, 2019–2026 Industry Excellence), featured services grid, infinite sponsors carousel, testimonials, and enterprise architecture overview.
   - **`/about` (About Us)**: Exact PDF timeline (2019–2026), evolution journey, and Founder & CEO **Muhammad Ali** vision statement.
   - **`/services` (Services Catalog)**: Complete 5-category breakdown including Custom Software, AI Agents & Automation, Digital Marketing & Executive Growth, UI/UX & Media Production, and IT Advisory & Cloud Infrastructure.
   - **`/consultancy` (Strategic Booking)**: Real working booking form with consultant selection (*Muhammad Ali* or *Anus Ahmed Khan*), purpose choices, date/time picker, frontend/backend validation, and automated SMTP email dispatching.
   - **`/pitch-deck` (Venture Acceleration)**: Working startup proposal submission system with 500-word limit validation, file type check (PDF/PPTX), file size limit (15MB), secure backend disk storage, and email notification to the evaluation committee.
   - **`/gallery` (Official Event Gallery)**: Interactive filtering tabs (*All Photos, MoU Signings, Tech Expos & Summits, Corporate Events, Team & Culture*) and responsive lightbox modal with event descriptions, dates, and locations (e.g., *INDUS AI WEEK*).
   - **`/careers` (Job Portal)**: Real job search, department and location filters, sample pre-populated active roles, and application modal with resume PDF upload.
   - **`/team` (Our Team)**: Organizational hierarchy showing Tier 1 (Founder & CEO Muhammad Ali, COO Anus Ahmed Khan), Tier 2 Department Leads, and Tier 3 Engineering & Creative Staff.

3. **Backend & Security**:
   - **Node.js + Express REST API** with modular architecture (`config`, `controllers`, `models`, `routes`, `middleware`, `services`).
   - **Database Storage**: MongoDB Mongoose schemas with an automatic in-memory fallback store for offline development.
   - **File Upload Security**: Strict MIME-type & extension validation with 15MB file size caps.
   - **Email Engine**: Nodemailer integration with simulated fallback logger.
   - **Security Layer**: Helmet headers, CORS policies, rate limiting, and centralized error handling.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Lucide React, Axios
- **Backend**: Node.js, Express.js, Multer, Nodemailer, Helmet, Express-Rate-Limit
- **Database**: MongoDB / Mongoose (with fail-safe memory store fallback)
- **Styling & Fonts**: Custom Design System (`#0F172A` Dark Navy, `#D97706` Amber/Gold, `#F8FAFC` Off-White, `#1E293B` Slate) & Google Inter font.

---

## 📁 Directory Structure

```
d:/BROS LLC PORTAL/
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js App Router pages & metadata
│   │   ├── components/    # Reusable UI sections (layout, home, about, etc.)
│   │   ├── lib/           # API client & axios instance
│   │   ├── types/         # TypeScript definitions
│   │   └── globals.css    # Design system tokens & utility classes
│   └── public/            # Static assets & robots.txt
├── backend/
│   ├── src/
│   │   ├── config/        # Database & app configurations
│   │   ├── controllers/   # Route handling business logic
│   │   ├── models/        # Mongoose models & memory fallback store
│   │   ├── routes/        # Express API endpoints
│   │   ├── middleware/    # Multer file upload & validation rules
│   │   ├── services/      # Nodemailer SMTP email service
│   │   └── server.js      # Main Express application entrypoint
│   ├── uploads/           # Secure directory for pitch decks & resumes
│   ├── .env               # Active backend environment variables
│   └── .env.example       # Template for production secrets
└── README.md
```

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js**: v18.x or higher
- **NPM**: v9.x or higher
- **MongoDB** (Optional, falls back to memory store seamlessly if uninstalled)

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
The backend server runs on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend web application runs on `http://localhost:3000`.

---

## ⚙️ Environment Variables Configuration

Create a `.env` file in the `backend/` directory based on `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bros_group_db
FRONTEND_URL=http://localhost:3000

# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM="Bros Group LLC" <info@brosgroupllc.com>
ADMIN_EMAIL=info@brosgroupllc.com
```

---

## 🌐 Production Deployment Architecture

- **Frontend**: Deploy `frontend/` to **Vercel** or **Netlify**. Set environment variable `NEXT_PUBLIC_API_URL=https://your-api-domain.com/api`.
- **Backend**: Deploy `backend/` to **Render**, **Railway**, or AWS EC2.
- **Database**: Connect to **MongoDB Atlas** database cluster.
- **Storage**: Configure AWS S3 or Cloudinary for persistent pitch deck and resume uploads.

---

## 📜 Compliance & Verification Checklist

- [x] All 8 pages implemented with dynamic Next.js App Router metadata & SEO tags.
- [x] Design system strictly enforced (`#0F172A`, `#D97706`, `#F8FAFC`, `#1E293B`).
- [x] Animated counter bar (20+ MOUs, 1,800+ Clients, 9 Sponsors, 2019-2026).
- [x] Strategic consultancy booking form with email dispatch.
- [x] Pitch Deck submission with 500-word limit and 15MB file upload validation.
- [x] Filterable event gallery with high-resolution lightbox modal.
- [x] Job portal with department/location filters & application modal with resume upload.
- [x] Verified mobile responsiveness, clean UI states (loading/error/success), and accessibility.
