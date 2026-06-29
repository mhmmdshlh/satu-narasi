# Satu Narasi

Satu Narasi is a citizen discussion and forum platform built to increase public participation in policy making. Citizens can engage in forum discussions, learn about public policy through structured learning modules, report issues in their neighborhoods, and view regional statistical data — all in one place.

Built as a single-page application with a mobile-first, performance-focused approach. Uses Supabase as the backend (PostgreSQL, authentication, file storage) and TanStack Query for efficient data caching and optimistic updates. Designed to be fast, accessible, and easy to deploy.

The platform includes a moderation system where admins can approve or reject citizen reports, delete discussions and comments, and manage user-generated content. Role-based access control supports three levels: citizen (default), admin, and super_admin.

## Tech Stack

- **React 19** with React Router v7
- **Vite** (build tool)
- **Tailwind CSS v4** (styling)
- **Supabase** (PostgreSQL, Auth, Storage)
- **TanStack Query v5** (data fetching & caching)
- **Font Awesome 7** (icons)
- **Vercel** (deployment)

## Features

- **Forum Diskusi** — Create discussions on civic topics, comment, like, and categorize posts. Includes a survey feature for prioritizing regional issues.
- **Akademi Kebijakan** — Structured learning modules on public policy, budget reading, data analysis, and advocacy. Features a progressive learning path from beginner to certification.
- **Civiclab** — Regional statistics dashboard for West Java (population, economic growth, administrative divisions). Citizens can submit reports with photos, track their status (pending/approved/rejected), and browse approved reports.
- **Authentication** — Email/password sign-up with Instagram-style username validation and real-time availability check. "Keep me signed in" option with persistent sessions. All auth error messages in Indonesian.
- **Admin Panel** — Dashboard with platform statistics. Moderate citizen reports (approve/reject) and manage discussions and comments. Protected by role-based access control.
