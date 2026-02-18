<div align="center">
<img width="1200" height="475" alt="HireHub Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# HireHub Job Portal

> A modern job marketplace and hiring assistant built with React, Vite, and Google Gemini that guides seekers and employers through every stage of the lifecycle—from discovery to application to onboarding.

## Functional Overview
- **Role-based dashboards:** seekers, employers, and admins each land on curated pages with the jobs, applicants, or analytics most relevant to them (see `pages/` for `Jobs`, `MyApplications`, `Dashboard`, etc.).
- **Rich job browsing:** searchable listings, detail pages, company profiles, and pricing tiers are delivered by the React router-driven pages under `pages/` paired with reusable UI atoms in `components/ui/`.
- **Secure session state:** `AuthContext` keeps user/auth tokens in sync with `localStorage`, exposing `login`, `logout`, and `updateUser` helpers so the layout components can react to authentication changes.
- **Responsive layout system:** `DashboardLayout` and `PublicLayout` wrap the experience with shared navigation, sidebars, and consistent spacing while letting each route own its content.

## AI Assistant
HireHub ships with `AIChatbot`, a floating assistant that connects to Google Gemini (`@google/genai`). It keeps a contextual conversation stream, injects role-aware instructions, and renders suggested prompts so seekers can explore career coaching and employers can craft job descriptions or screening questions. When the chatbot fails to connect, it notifies the user and logs the error for debugging.

## Technologies & Services
- **Frontend:** React + Vite + TypeScript + Tailwind-style utilities for the UI.
- **AI:** `GoogleGenAI` powers the `gemini-3-flash-preview` model from `components/AIChatbot.tsx`.
- **API layer placeholder:** `services/api.ts` centralizes HTTP calls so backends (PHP/Django/Node) can plug in later without reshaping the views.
- **Routing:** `react-router-dom` orchestrates navigation across the `pages/` directory.

## Running Locally
1. Clone the repo and install dependencies: `npm install`.
2. Create `.env.local` and set the required environment variables: `VITE_GOOGLE_GENAI_API_KEY=<your-key>` (sensitive keys stay out of source control).
3. Start the dev server: `npm run dev`. The UI opens on `http://localhost:3000/` while the AI assistant uses the provided Gemini key.

## Building & Deploying
```
npm run build
```
- Copy the `dist/` contents to your static host (e.g., `C:/xampp/htdocs/hirehub-ui` if you serve via XAMPP).
- Point `services/api.ts` to a backend you prefer (PHP scripts, Django REST, etc.), and ensure the API emits JSON with CORS headers during development.

## Evidence
1. Homepage with job feed and featured sections
   ![Home screenshot](photo/Screenshot%202026-02-18%20144617.png)
2. AI assistant modal and prompt list
   ![AI chatbot screenshot](photo/Screenshot%202026-02-18%20145925.png)