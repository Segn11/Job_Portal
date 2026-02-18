

## 🚀 HireHub – AI-Powered Job Portal

HireHub is a modern, AI-enhanced job marketplace built with React, Vite, TypeScript, and Google Gemini AI. It streamlines the hiring lifecycle — from job discovery and applications to employer screening and onboarding.

## 🌟 Overview
HireHub is designed to deliver a seamless hiring experience for:

- 👩‍💼 Job Seekers
- 🏢 Employers
- 🛠️ Administrators

The platform combines a responsive UI architecture with an intelligent AI assistant to improve productivity and engagement across all user roles.

## ✨ Key Features
### 🔐 Role-Based Dashboards
Each user type lands on a personalized dashboard:

- **Job Seekers** → Browse jobs, manage applications, track progress
- **Employers** → Post jobs, review applicants, manage listings
- **Admins** → Platform analytics and oversight tools

All routes live under the `pages/` directory and are orchestrated through `react-router-dom` for smooth navigation.

### 🔎 Advanced Job Browsing

- Searchable job listings
- Detailed job description pages
- Company profiles
- Pricing tiers
- Reusable UI primitives in `components/ui/`

### 🧠 AI Hiring Assistant (Google Gemini)
HireHub ships with a floating AI chatbot backed by `gemini-3-flash-preview` that:

- Guides seekers with resume tips, career coaching, interview prep, and skill recommendations
- Helps employers generate descriptions, screen candidates, and orchestrate workflows
- Maintains contextual conversation state, role-aware instructions, and graceful failure handling with error logging

### 🛡️ Secure Authentication System
`AuthContext` manages:

- Authentication tokens
- Persistent session state via `localStorage`
- `login`, `logout`, and `updateUser` helpers
- Real-time UI updates when the auth state changes

### 🎨 Modern Layout Architecture

- `PublicLayout` anchors the marketing and public-facing sections
- `DashboardLayout` keeps authenticated experiences consistent
- Responsive design, utility-first styling, and scalable component structure

## 🏗️ Tech Stack
| Layer | Technology |
| --- | --- |
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind-style utility classes |
| AI Engine | Google Gemini (`@google/genai`) |
| Routing | `react-router-dom` |
| API Structure | Centralized service layer (`services/api.ts`) |

## 📂 Project Structure (`src/`)
- `components/`
  - `ui/`
  - `AIChatbot.tsx`
- `context/`
  - `AuthContext.tsx`
- `layouts/`
  - `DashboardLayout.tsx`
  - `PublicLayout.tsx`
- `pages/`
  - `Jobs.tsx`, `Dashboard.tsx`, `MyApplications.tsx`, etc.


## ⚙️ Running Locally
1. **Clone Repository**
   ```bash
   git clone <your-repo-url>
   cd hirehub
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Setup Environment Variables**
   Create `.env.local` with:
   ```env
   VITE_GOOGLE_GENAI_API_KEY=your_api_key_here
   ```
   ⚠️ Never commit sensitive keys to version control.
4. **Start Development Server**
   ```bash
   npm run dev
   ```
   The app will run at `http://localhost:3000/` with the AI assistant powered by Gemini.

## 🚀 Production Build
```bash
npm run build
```
Deploy the generated `dist/` folder to any static hosting provider such as Vercel, Netlify, Firebase Hosting, or XAMPP/Apache if you prefer PHP.

## 📸 Screenshots
### 🏠 Homepage
Job feed with featured listings and intuitive navigation.

![Homepage](photo/Screenshot%202026-02-18%20144617.png)

### 🤖 AI Assistant
Context-aware hiring and career assistant powered by Gemini.

![AI Assistant](photo/Screenshot%202026-02-18%20145925.png)

## 🔮 Future Improvements
- Backend integration (Node / Django / Laravel)
- Resume upload & parsing engine
- Payment gateway / monetization flows
- Real-time notifications and alerts
- Advanced analytics dashboard
- Role-based access control (RBAC)

## 🎯 Why HireHub?
- Clean architecture
- AI-powered productivity
- Scalable frontend structure
- Ready for backend integration
- Production-level organization

## 👨‍💻 Author
Built with passion by Segni Nadew — Frontend & Full-Stack Developer
