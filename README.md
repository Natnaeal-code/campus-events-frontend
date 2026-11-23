Campus Events Application
A responsive web application built with Next.js and TypeScript that connects to a NestJS backend API to manage and explore campus events.
Technologies Used
- Next.js and React
- TypeScript
- Tailwind CSS
- Native Fetch API
- NestJS REST API
Features
- Home page with event discovery.
- Browse and view event details.
- Search events by title.
- Filter by category, location, and publication status.
- Sort and paginate event listings.
- View event sessions and session details.
- User registration, login, and logout.
- Admin-only event creation.
- API error handling and responsive design.
Getting Started
Installation
git clone YOUR_GITHUB_REPOSITORY_URL
cd campus-events-frontend
npm install
Environment Variables
Create a .env.local file in the project root:
CAMPUS_EVENTS_API_URL=http://localhost:3006/api
CAMPUS_EVENTS_API_KEY=your_api_key
Replace your_api_key with your actual backend API key. Never commit .env.local to GitHub.
Run the Application
Start the NestJS backend, then run:
npm run dev
Open http://localhost:3001.
Project Structure
src/
├── app/
│   ├── admin/
│   ├── api/
│   │   ├── auth/
│   │   └── events/
│   ├── create-event/
│   ├── events/
│   │   └── [id]/
│   │       └── sessions/
│   │           └── [sessionId]/
│   ├── login/
│   ├── register/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CreateEventForm.tsx
│   ├── Footer.tsx
│   ├── LogoutButton.tsx
│   └── Navbar.tsx
├── services/
│   └── eventServices.ts
└── types/
    └── event.ts
API Integration
The application uses the native Fetch API and Next.js API routes to communicate with the NestJS backend.

Main operations include retrieving events, upcoming events, event details, sessions, and creating events.
Author
Developed as part of the CodeOps Module 4 Campus Events Application project.