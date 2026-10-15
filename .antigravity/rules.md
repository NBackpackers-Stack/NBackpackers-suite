# Client Architecture & Coding Rules

This document outlines the coding standards, folder structure, and architecture rules for all code written inside the `client/` folder. All new features and refactored code must strictly adhere to the layered structure established by the authentication/login system.

---

## 1. Architectural Philosophy: The Login Pattern

In this codebase, we enforce a strict separation of concerns into **5 distinct layers**:

```
Client Architecture Flow:
┌─────────────────────────────────┐
│  1. Route Layer (Next.js App)   │  app/<feature>/page.tsx (Thin wrapper)
└────────────────┬────────────────┘
                 │ renders
                 ▼
┌─────────────────────────────────┐
│  2. Component Layer (UI & JSX)  │  component/<feature>/<ComponentName>.tsx
└────────────────┬────────────────┘
                 │ consumes
                 ▼
┌─────────────────────────────────┐
│  3. Hook Layer (State & Logic)  │  hooks/<feature>/use<Feature>.ts
└────────────────┬────────────────┘
                 │ executes
                 ▼
┌─────────────────────────────────┐
│  4. Service Layer (API/Network) │  services/<feature>.services.ts
└────────────────┬────────────────┘
                 │ references
                 ▼
┌─────────────────────────────────┐
│  5. Constants Layer             │  constants/api.ts
└─────────────────────────────────┘
```

---

## 2. Directory Structure Breakdown

```
client/
├── app/                  # Next.js App Router (Routing entrypoints only)
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx  # Thin page wrapper
│   │   └── signup/
│   │       └── page.tsx
│   └── trips/
│       └── ...
├── component/            # Presentation & visual components
│   ├── auth/
│   │   ├── LoginFrom.tsx # UI, styling, Tailwind, inputs, triggers hook
│   │   └── SignupForn.tsx
│   └── ...
├── hooks/                # Custom React hooks (Business logic, state, form handlers)
│   ├── auth/
│   │   ├── useLogin.ts   # Form state, change handlers, validation, calls service
│   │   └── useSignUp.ts
│   └── ...
├── services/             # HTTP calls & API communication
│   ├── login.services.ts # Axios calls, endpoint requests, error handling
│   ├── signup.services.ts
│   └── ...
├── constants/            # Global constants & endpoint mappings
│   └── api.ts            # Centralized API URLs
└── models/               # Data schemas & TypeScript types
```

---

## 3. Strict Layer Responsibilities

### Layer 1: Route Layer (`client/app/<feature>/page.tsx`)
* **Role**: Serves solely as the Next.js page route entrypoint.
* **Rules**:
  - Keep it lightweight and minimal (typically under 20-30 lines).
  - Do **NOT** put heavy inline forms, complex state logic, or direct API fetches in `page.tsx`.
  - Simply import and render the corresponding feature component wrapped inside semantic tags (e.g. `<main>`).

**Login Page Blueprint:**
```tsx
// client/app/auth/login/page.tsx
"use client";

import LoginFrom from "@/component/auth/LoginFrom";

export default function LoginPage() {
  return (
    <main>
      <LoginFrom />
    </main>
  );
}
```

---

### Layer 2: Component Layer (`client/component/<feature>/<ComponentName>.tsx`)
* **Role**: Visual presentation, JSX markup, responsive layouts, animations, and form inputs.
* **Rules**:
  - Consume state and handlers by calling the feature hook (e.g. `const { formData, handleChange, handleSubmit, isLoading } = useFeature();`).
  - Do **NOT** write raw `axios.get` or `axios.post` directly inside UI components.
  - **UI Library**: Use **Shadcn components** for UI elements (buttons, inputs, dialogs, cards, dropdowns, badges, tabs, etc.).
  - **Custom Building**: When custom components or layouts need to be built, construct them with **Tailwind CSS** utility classes.
  - **Modern UI/UX**: Always deliver a modern, sleek, user-friendly look and feel with curated color palettes matching the existing application aesthetic.
  - Organize subcomponents under subfolders matching the feature name (e.g. `component/auth/`, `component/trips/`, `component/mess/`).

**Login Component Blueprint:**
```tsx
// client/component/auth/LoginFrom.tsx
"use client";

import React from "react";
import Link from "next/link";
import useLogin from "@/hooks/auth/useLogin";

export default function LoginFrom() {
  const { formData, handleChange, handleSubmit, isLoading } = useLogin();

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
```

---

### Layer 3: Hook Layer (`client/hooks/<feature>/use<Feature>.ts`)
* **Role**: Encapsulates state management, form inputs, validation, submission workflows, and loading states.
* **Rules**:
  - Name hooks with the `use` prefix (e.g. `useLogin.ts`, `useTrips.ts`).
  - Store feature-specific hooks inside `client/hooks/<feature>/`.
  - Handle input change events (`handleChange`), validations, and event submissions (`handleSubmit`).
  - Delegate the actual network call to the service function.

**Login Hook Blueprint:**
```typescript
// client/hooks/auth/useLogin.ts
import { useState } from "react";
import Login from "@/services/login.services";

export default function useLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all the blanks");
      return;
    }

    try {
      setIsLoading(true);
      const response = await Login(formData);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
  };
}
```

---

### Layer 4: Service Layer (`client/services/<feature>.services.ts`)
* **Role**: Handles network requests, Axios HTTP methods, headers, and API error formatting.
* **Rules**:
  - Store service files in `client/services/`.
  - File naming: `<feature>.services.ts` (e.g. `login.services.ts`, `trips.services.ts`, `inventory.services.ts`).
  - Reference endpoints from `@/constants/api`.
  - Handle and return response data or errors gracefully.

**Login Service Blueprint:**
```typescript
// client/services/login.services.ts
import axios from "axios";
import { API } from "@/constants/api";

export default async function Login(data: any) {
  try {
    const response = await axios.post(API.login, data);
    return response.data;
  } catch (error: any) {
    console.error("Login service error:", error.response?.data || error);
    throw error;
  }
}
```

---

### Layer 5: Constants Layer (`client/constants/api.ts`)
* **Role**: Central source of truth for all API routes.
* **Rules**:
  - Add all new backend or Next.js API endpoints to `API` in `client/constants/api.ts`.
  - Never hardcode raw URL strings in components or services.

**API Constants Blueprint:**
```typescript
// client/constants/api.ts
export const API = {
  signup: "http://localhost:4000/api/v1/auth/signup",
  login: "http://localhost:4000/api/v1/auth/login",
  inventory: "/api/mess/putstock",
  getInventory: "/api/mess/getStock",
  addItems: "/api/mess/addItem",
  addConsumption: "/api/mess/addConsumption",
  purchaseStock: "/api/mess/purchaseStock",
  feedback: "/api/mess/feedback",
  recciSave: "/api/recci/save",
  recciGetAll: "/api/recci/getAll",
  recciGetById: "/api/recci/getById",
};
```

---

## 4. Checklist For Creating Any New Feature in `client`

When adding or refactoring a page or feature (e.g., `trips`, `feedback`, `inventory`, `profile`):

1. **Step 1: Constants**: Register endpoints in `client/constants/api.ts`.
2. **Step 2: Service**: Create `client/services/<feature>.services.ts` for network calls.
3. **Step 3: Hook**: Create `client/hooks/<feature>/use<Feature>.ts` for state & actions.
4. **Step 4: Component**: Create `client/component/<feature>/<FeatureComponent>.tsx` for UI markup.
   - Use **Shadcn components** for UI building blocks.
   - Build custom layout elements with **Tailwind CSS**.
   - Ensure a modern, responsive, and user-friendly UI/UX look.
5. **Step 5: Route**: Create `client/app/<feature>/page.tsx` as a clean wrapper rendering the component.

---

## 5. UI/UX & Styling Standards: Shadcn & Tailwind CSS

### 1. Primary Rule: Use Shadcn Components
- Whenever creating UI components (buttons, input fields, modals/dialogs, dropdowns, cards, badges, tabs, sheets, toasts, etc.), prioritize **Shadcn UI components**.
- Keep components modular, accessible, and theme-consistent.

### 2. Custom Building: Build with Tailwind CSS
- When a component or layout cannot be provided directly by an existing component or requires custom layout/styling, **build it using Tailwind CSS utility classes**.
- Avoid writing arbitrary inline `<style>` tags or raw CSS files when utility classes can achieve the desired layout.
- Use responsive modifiers (`sm:`, `md:`, `lg:`) to ensure optimal mobile, tablet, and desktop viewports.

### 3. Aesthetics & User Experience (UI/UX)
- **Modern & Friendly Look**: Always design with a modern, polished aesthetic:
  - Clean border radii (`rounded-2xl`, `rounded-xl`).
  - Subtle borders (`border border-slate-100` or `border-slate-200/80`).
  - Soft elevations and shadows (`shadow-sm`, `shadow-md`, `hover:shadow-lg`).
  - Micro-interactions (`transition-all duration-200`, `active:scale-[0.98]`, hover states).
- **Curated Color Palettes**:
  - Match existing app color schemes (slate/indigo/emerald/amber accents).
  - Avoid harsh primary colors; use balanced slate backgrounds (`bg-slate-50`, `bg-white`) with high-contrast readable typography (`text-slate-900`, `text-slate-600`, `text-slate-400`).
- **Interactive Feedback**:
  - Always provide visual feedback for loading states, empty states, and user actions (e.g., loaders, skeleton states, toasts, disabled button states).

