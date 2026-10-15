# Agent Guidelines & Development Standards

Welcome to the project! This document outlines key project conventions, development workflows, and architectural rules that all coding agents and developers must follow.

---

## 1. Project Overview

- **Project Root**: Monorepo containing:
  - `client/`: Next.js frontend application with Tailwind CSS and App Router.
  - `backend/`: Node.js / Express backend service with MongoDB.
- **Node/Package Manager**: `pnpm` (run commands inside respective folders, e.g., `client/` or `backend/`).

---

## 2. Client Folder Architecture & Standards

All code written in the `client/` directory must strictly follow the **Login Page Architectural Pattern** documented in [.antigravity/rules.md](file:///.antigravity/rules.md).

### Layered Structure:
1. **Route Layer (`client/app/<feature>/page.tsx`)**:
   - Thin wrapper entrypoints only (e.g. `<main><FeatureComponent /></main>`).
   - Do **NOT** put large forms, direct API requests, or complex state logic inside `page.tsx`.
2. **Component Layer (`client/component/<feature>/<ComponentName>.tsx`)**:
   - Presentation only. Responsible for JSX layout, visual markup, and Tailwind CSS.
   - Calls and consumes custom hooks from `@/hooks/<feature>/...`.
3. **Hook Layer (`client/hooks/<feature>/use<Feature>.ts`)**:
   - Contains all state management, input handling (`handleChange`), and form submission orchestration (`handleSubmit`).
   - Calls the corresponding service function for data fetching/mutations.
4. **Service Layer (`client/services/<feature>.services.ts`)**:
   - Responsible for Axios HTTP calls, headers, and API error formatting.
   - Uses endpoint constants from `@/constants/api`.
5. **Constants Layer (`client/constants/api.ts`)**:
   - Central definition for all API endpoints. Never hardcode API URLs in components or services.

---

## 3. Reference Implementation: Login Page

When creating or modifying features, use the authentication/login flow as the gold standard:

| Layer | File Path | Responsibility |
|---|---|---|
| **Route** | [`client/app/auth/login/page.tsx`](file:///client/app/auth/login/page.tsx) | Minimal page wrapper rendering `<LoginFrom />` |
| **Component** | [`client/component/auth/LoginFrom.tsx`](file:///client/component/auth/LoginFrom.tsx) | Visual form layout, styling, and inputs |
| **Hook** | [`client/hooks/auth/useLogin.ts`](file:///client/hooks/auth/useLogin.ts) | Form state, change handlers, validation |
| **Service** | [`client/services/login.services.ts`](file:///client/services/login.services.ts) | Axios POST request to `API.login` |
| **Constants** | [`client/constants/api.ts`](file:///client/constants/api.ts) | Endpoint URL definition |

---

## 4. Coding & Quality Rules

- **TypeScript**: Always write strictly typed TypeScript (`.tsx` / `.ts`). Avoid unnecessary `any` types when schemas or models are available.
- **Styling & UI**: Use **Shadcn components** with **Tailwind CSS** utility classes. Always provide a modern, sleek UI/UX look that is user-friendly with curated color palettes matching existing app design. When custom components or layouts need to be built, construct them with Tailwind CSS.
- **Verification**: Always run `pnpm exec tsc --noEmit` in `client/` after making edits to guarantee zero type errors.
- **Rules Documentation**: For full details, code blueprints, and checklists, consult [.antigravity/rules.md](file:///.antigravity/rules.md).
