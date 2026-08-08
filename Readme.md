# Company Essentials - Experiential Learning Operations Suite

Company Essentials is a web-based CRM and operations suite designed for organizations that run experiential learning programs for children, including educational tours, travel programs, same-day excursions, destination planning, food service operations, and manager-led task coordination.

The platform brings trip operations, internal checklists, inventory control, mess feedback, reporting, and staff workflows into one structured system so teams can plan programs with confidence and maintain a professional operating standard across every student experience.

## Purpose

Experiential learning companies handle many moving parts at the same time: student safety, destination readiness, itinerary planning, food quality, stock availability, staff responsibilities, vendor coordination, parent communication, and post-program feedback.

This project is built as a central digital workspace for those responsibilities. It supports both customer-facing travel planning workflows and internal CRM-style operations used by managers, trip teams, and support staff.

## Key Modules

### Trip And Travel Management

- Create and manage trips for school and student travel programs.
- Track trip status and view detailed trip records.
- Maintain destination and resort information.
- Support recce tour records for pre-visit inspection and destination readiness.
- Provide a dedicated same-day excursion section for short educational outings.
- Generate itinerary plans for organized travel programs.

### Manager Operations

- Create internal tasks for operational teams.
- Track manager task status and submissions.
- View task-specific pages for follow-up and execution.
- Support branch or department-level coordination through a central dashboard.

### Mess, Food And Inventory Operations

- Manage mess inventory and stock availability.
- Add new stock items and update item details.
- Record daily consumption across meals.
- Track purchase stock entries.
- Review stock movement and consumption reports.
- Collect and review mess feedback, including ratings and optional images.

### CRM And User Access

- Authentication support for signup and login.
- Backend API structure for user management.
- Organized models, services, hooks, and route handlers for maintainable development.

### Progressive Web App Support

- Includes PWA assets and service worker files.
- Supports a web-app experience suitable for operational teams who need fast access during field programs.

## Technology Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Express.js, TypeScript, Node.js
- Database: MongoDB with Mongoose
- Authentication: JWT-based backend authentication
- Media Uploads: Cloudinary integration for feedback and recce images
- Package Manager: pnpm

## Project Structure

```text
Checklist/
├── client/                  # Next.js web app and internal API routes
│   ├── app/                 # App Router pages and API route handlers
│   ├── component/           # Reusable UI and feature components
│   ├── hooks/               # Feature-specific React hooks
│   ├── models/              # Mongoose models used by Next.js API routes
│   ├── services/            # Frontend service wrappers
│   ├── constants/           # API constants and shared values
│   ├── public/              # Images, PWA assets, and static data
│   └── utils/               # Shared utilities such as MongoDB connection
│
├── backend/                 # Express API service
│   └── src/
│       ├── config/          # Database configuration
│       ├── controllers/     # Request controllers
│       ├── errors/          # Application error classes
│       ├── middlewares/     # Express middleware
│       ├── models/          # Backend data models
│       ├── repositories/    # Database access layer
│       ├── routes/          # API route definitions
│       ├── services/        # Business logic
│       └── utils/           # Password hashing and JWT helpers
│
└── Readme.md                # Project documentation
```

## Important Application Areas

| Area | Path | Description |
| --- | --- | --- |
| Main portal | `client/app/page.tsx` | Landing dashboard for the operational suite |
| Trips | `client/app/trips/` | Trip planning, trip status, resorts, destinations, and recce tours |
| Same-day excursions | `client/app/same-day-excursion/` | Short educational outing section |
| Manager dashboard | `client/app/manager/` | Task creation, tracking, and manager status workflows |
| Mess and inventory | `client/app/mess/` | Inventory, stock purchase, consumption, QR form, and reports |
| Feedback | `client/app/feedback/` | Mess feedback collection and review |
| Itinerary generator | `client/app/itinerary-generator/` | Itinerary planning workspace |
| Backend auth API | `backend/src/routes/api/auth/` | Signup and login API routes |

## Getting Started

### Prerequisites

- Node.js
- pnpm
- MongoDB database connection string
- Cloudinary account for image upload features

### 1. Install Frontend Dependencies

```bash
cd client
pnpm install
```

### 2. Install Backend Dependencies

```bash
cd backend
pnpm install
```

### 3. Configure Environment Variables

Create `client/.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Create `backend/.env`:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Note: the current frontend authentication service points to `http://localhost:4000/api/v1/auth`, so the backend should run on port `4000` unless the frontend API constants are updated.

### 4. Run The Backend

```bash
cd backend
pnpm dev
```

Backend health check:

```text
http://localhost:4000/health
```

### 5. Run The Frontend

```bash
cd client
pnpm dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

### Client

```bash
pnpm dev       # Start the Next.js development server
pnpm build     # Build the production frontend
pnpm start     # Start the production frontend
pnpm lint      # Run ESLint
```

### Backend

```bash
pnpm dev       # Start Express with tsx watch
pnpm build     # Compile TypeScript
pnpm start     # Run compiled backend from dist
```

## Data And Media

- MongoDB stores trip records, manager tasks, inventory entries, consumption history, purchase stock, recce data, feedback, and users.
- Cloudinary is used for uploaded images in feedback and recce workflows.
- Static destination, inventory, same-day excursion, and manager task data live under `client/public/`.

## Development Standards

This project is intended to represent a reputed experiential learning and travel operations company. New development should preserve that standard by keeping workflows clear, reliable, and easy for staff to operate during live programs.

Recommended priorities:

- Keep student travel and safety workflows simple and auditable.
- Validate operational data before saving it.
- Keep manager dashboards focused on action, status, and accountability.
- Maintain clear naming for trip, recce, mess, inventory, and task modules.
- Protect secrets by using environment variables only.
- Keep customer-facing and internal operations experiences professional, consistent, and mobile-friendly.

## Product Vision

The long-term goal of this suite is to serve as a dependable digital backbone for experiential learning companies. It should help teams plan better programs, coordinate staff responsibilities, maintain food and inventory standards, document field readiness, and deliver memorable educational travel experiences for children.
