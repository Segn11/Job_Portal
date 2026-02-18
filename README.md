🚀 HireHub – AI-Powered Job Portal

HireHub is a modern, AI-enhanced job marketplace built with React, Vite, TypeScript, and Google Gemini AI.
It streamlines the hiring lifecycle — from job discovery and applications to employer screening and onboarding.

🌟 Overview

HireHub is designed to deliver a seamless hiring experience for:

👩‍💼 Job Seekers

🏢 Employers

🛠️ Administrators

The platform combines a responsive UI architecture with an intelligent AI assistant to improve productivity and engagement across all user roles.

✨ Key Features
🔐 Role-Based Dashboards

Each user type lands on a personalized dashboard:

Job Seekers → Browse jobs, manage applications, track progress

Employers → Post jobs, review applicants, manage listings

Admins → Platform analytics and oversight tools

All routes are structured under the pages/ directory and managed using react-router-dom.

🔎 Advanced Job Browsing

Searchable job listings

Detailed job description pages

Company profiles

Pricing tiers

Reusable UI components in components/ui/

🧠 AI Hiring Assistant (Google Gemini)

HireHub includes a floating AI chatbot powered by Google Gemini (gemini-3-flash-preview).

💡 For Job Seekers:

Resume guidance

Career coaching

Interview preparation

Skill recommendations

💡 For Employers:

Job description generation

Screening question suggestions

Hiring workflow assistance

The chatbot:

Maintains contextual conversation state

Injects role-aware system instructions

Gracefully handles API failures

Logs errors for debugging

🛡️ Secure Authentication System

AuthContext manages:

Authentication tokens

Persistent session state via localStorage

login, logout, and updateUser helpers

Real-time UI updates on auth state changes

🎨 Modern Layout Architecture

PublicLayout → Marketing & public pages

DashboardLayout → Authenticated user experience

Fully responsive

Clean utility-based styling

Scalable component structure

🏗️ Tech Stack
Layer	Technology
Frontend	React + Vite + TypeScript
Styling	Tailwind-style utility classes
AI Engine	Google Gemini (@google/genai)
Routing	react-router-dom
API Structure	Centralized service layer (services/api.ts)
📂 Project Structure
src/
 ├── components/
 │    ├── ui/
 │    └── AIChatbot.tsx
 ├── context/
 │    └── AuthContext.tsx
 ├── layouts/
 │    ├── DashboardLayout.tsx
 │    └── PublicLayout.tsx
 ├── pages/
 │    ├── Jobs.tsx
 │    ├── Dashboard.tsx
 │    ├── MyApplications.tsx
 │    └── ...
 └── services/
      └── api.ts

⚙️ Running Locally
1️⃣ Clone Repository
git clone <your-repo-url>
cd hirehub

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create .env.local:

VITE_GOOGLE_GENAI_API_KEY=your_api_key_here


⚠️ Never commit sensitive keys to version control.

4️⃣ Start Development Server
npm run dev


App runs at:

http://localhost:3000/

🚀 Production Build
npm run build


Deploy the generated dist/ folder to:

Vercel

Netlify

Firebase Hosting

Or any static hosting provider

📸 Screenshots
🏠 Homepage

Job feed with featured listings and intuitive navigation.

🤖 AI Assistant

Context-aware hiring and career assistant powered by Gemini.

🔮 Future Improvements

Backend integration (Node / Django / Laravel)

Resume upload & parsing

Payment gateway integration

Real-time notifications

Advanced analytics dashboard

Role-based access control (RBAC)

🎯 Why HireHub?

✔ Clean architecture
✔ AI-powered productivity
✔ Scalable frontend structure
✔ Ready for backend integration
✔ Production-level organization

👨‍💻 Author

Built with passion by Segni Nadew
Frontend & Full-Stack Developer
