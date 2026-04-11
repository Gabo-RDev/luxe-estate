# Luxe Estate

A premium real estate platform built with **Next.js 16**, **Supabase**, and **Tailwind CSS v4**. Luxe Estate allows users to browse luxury properties for sale or rent, save favorites, schedule property viewings, and manage their profile — while administrators can create and manage listings through a dedicated dashboard.

---

## ✨ Features

### Public-facing
- **Property Listings** — Browse properties filtered by listing type (Sale / Rent), price range, category, beds, baths, amenities, and location
- **Property Detail Page** — Full property gallery with lightbox support, interactive Leaflet map, and key stats
- **Schedule a Viewing** — Authenticated users can book property visits by selecting a date and time slot via a calendar-based form
- **Saved Homes** — Cookie-based favorites system to save and revisit preferred listings
- **User Profile** — Tabbed dashboard showing saved properties, scheduled visits, and account preferences
- **Internationalization** — UI strings available in English, Spanish, and French (`en`, `es`, `fr`)

### Admin
- **Property Management** — Create, edit, and manage property listings through a full-featured admin form
- **Image Uploads** — Property images stored in Supabase Storage with server-side persistence via Server Actions
- **Role-based Access** — Admin routes protected by middleware; admin link surfaces dynamically in the public nav

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Vanilla CSS |
| UI Components | [shadcn/ui](https://ui.shadcn.com) + Radix UI |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev) |
| Maps | [Leaflet](https://leafletjs.com) + [React Leaflet](https://react-leaflet.js.org) |
| Calendar | [React Day Picker](https://react-day-picker.js.org) |
| Backend / DB | [Supabase](https://supabase.com) (PostgreSQL + RLS) |
| Auth | Supabase Auth (SSR) |
| Storage | Supabase Storage |
| Date utils | [date-fns](https://date-fns.org) |

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages & layouts
│   ├── admin/              # Admin dashboard (properties management)
│   ├── auth/               # Auth callback handler
│   ├── login/              # Login page
│   ├── profile/            # User profile page
│   └── properties/         # Property listings & detail pages
│       └── [slug]/
│           └── schedule/   # Visit scheduling page
├── api/                    # Supabase data-fetching functions
├── components/
│   ├── layout/             # PublicNav, NavActions, etc.
│   └── ui/                 # shadcn/ui primitives (Button, Calendar…)
├── features/
│   ├── admin/              # Admin property form & hooks
│   ├── profile/            # Profile tabs & stats components
│   └── properties/         # Property cards, gallery, filters, schedule form
├── hooks/                  # Shared custom React hooks
├── interfaces/             # TypeScript interface definitions
├── lib/
│   ├── constants.ts        # App-wide constants (filters, time slots, etc.)
│   ├── utils.ts            # Shared utility functions
│   └── i18n/               # Translation dictionaries (en, es, fr)
├── reducers/               # useReducer state management
├── styles/
│   └── globals.css         # Global CSS & design tokens
├── types/                  # Shared TypeScript type aliases
└── middleware.ts           # Route protection & locale detection
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20+
- A [Supabase](https://supabase.com) project with:
  - A `properties` table
  - A `scheduled_visits` table
  - A `profiles` table with a `role` column
  - A storage bucket named `property-images`
  - Row Level Security policies configured accordingly

### 1. Clone the repository

```bash
git clone https://github.com/your-username/luxe-estate.git
cd luxe-estate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the template and fill in your Supabase credentials:

```bash
cp .env.template .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> ⚠️ **Never commit `.env.local`** — it is already listed in `.gitignore`.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the production bundle |
| `npm start` | Start the production server (requires build) |
| `npm run lint` | Run ESLint |

---

## 🌐 Internationalization

The app detects the user's preferred locale via middleware and serves translated content from `src/lib/i18n/dictionaries/`. Currently supported locales:

- `en` — English *(default)*
- `es` — Spanish
- `fr` — French

---

## 🔐 Authentication & Authorization

- Authentication is handled by **Supabase Auth** with SSR cookie-based sessions.
- The `middleware.ts` file protects routes that require authentication (e.g., `/profile`, `/properties/[slug]/schedule`).
- Admin routes (`/admin/**`) are protected by a role check against the `profiles` table.
- Server Actions use the **Service Role key** to bypass RLS where necessary (e.g., creating/updating property records).

---

## 🚢 Deployment

Deploy instantly on [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Make sure to add all environment variables from `.env.template` to your Vercel project settings before deploying.
