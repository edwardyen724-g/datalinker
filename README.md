# DataLinker

> Streamline dynamic data management for low-code developers.

**Status:** 🚧 In Development

## Problem
Developers struggle with complex data entries and tedious workarounds for interactive data linking. DataLinker simplifies these processes with intuitive interfaces, enhancing productivity and reducing friction.

## MVP Features
- Dynamic value assignments to data fields through an easy-to-use visual editor.
- Drag-and-drop interface for linking data entries and establishing relationships.
- Predefined templates for common data management scenarios to speed up setup.
- Real-time previews of data interactions as changes are made.
- Contextual help and tooltips for guiding users through complex data management tasks.

## Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Next.js API Routes
- **Database:** Supabase Postgres
- **Auth:** Supabase Auth
- **Payments:** Stripe
- **Hosting:** Vercel

## Architecture Notes
The choice of Next.js provides a seamless integration of frontend and backend with API routes, allowing for quick development and deployment. Supabase offers robust user authentication and a scalable PostgreSQL database, reducing the complexity of building and maintaining a backend.

## User Stories
- Dynamic Value Assignments
- Drag-and-Drop Interface
- Predefined Templates
- Real-Time Previews
- Contextual Help and Tooltips
- User Authentication
- Subscription Management

## Launch Checklist
- [ ] Finalize the landing page design
- [ ] Set up Firebase and backend functions
- [ ] Develop the visual editor UI
- [ ] Implement user authentication features
- [ ] Test all user stories for acceptance criteria

## Setup
```bash
cp .env.example .env.local
# Fill in your environment variables
npm install
npm run dev
```