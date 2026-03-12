# Next.js Folder Structure + Naming Cheat Sheet

`````markdown id="nsfcs1"
# Next.js Folder Structure + Naming Cheat Sheet

This markdown file combines **folder structure** with **naming conventions** to
ensure consistency in a Next.js project using the App Router.

> Rule: The `app/` directory is **exclusively for routing**.

---

# 1. Project Root / Top-Level Files

| File / Folder    | Purpose                        | Naming / Convention                      |
| ---------------- | ------------------------------ | ---------------------------------------- |
| `app/`           | Routing                        | Only contains routing files              |
| `components/`    | Reusable UI components         | PascalCase                               |
| `features/`      | Feature/domain logic           | kebab-case folder, PascalCase components |
| `hooks/`         | Global reusable hooks          | useCamelCase.ts                          |
| `lib/`           | Utilities / services / helpers | camelCase.ts                             |
| `types/`         | TypeScript types               | PascalCase.ts                            |
| `styles/`        | Global CSS / themes            | kebab-case or PascalCase.module.css      |
| `public/`        | Static assets                  | lowercase, kebab-case                    |
| `next.config.js` | Next.js configuration          | kebab-case                               |
| `.env.local`     | Environment variables          | UPPER_SNAKE_CASE                         |
| `middleware.ts`  | Edge middleware                | camelCase.ts                             |

---

# 2. `app/` Folder – Routing

| File                             | Purpose               | Naming / Convention                        |
| -------------------------------- | --------------------- | ------------------------------------------ |
| `page.tsx`                       | Main page component   | PascalCase inside, file must be `page.tsx` |
| `layout.tsx`                     | Layout wrapper        | PascalCase inside, `layout.tsx`            |
| `loading.tsx`                    | Suspense fallback     | PascalCase inside, `loading.tsx`           |
| `error.tsx` / `global-error.tsx` | Error boundaries      | PascalCase inside                          |
| `not-found.tsx`                  | 404 UI                | PascalCase inside                          |
| `template.tsx`                   | Re-rendered layout    | PascalCase inside                          |
| `route.ts`                       | API or dynamic routes | camelCase.ts                               |

**Routing folders:**

- Nested folders map to URL path:  
  `app/blog/page.tsx` → `/blog`
- Dynamic routes use brackets:  
  `[slug]` → `/blog/[slug]`
- Route groups with parentheses `(marketing)` for layout separation
- Private folders with `_folderName` for utilities or shared code

---

# 3. `components/` Folder – UI Components

| Type              | Naming / Convention                        |
| ----------------- | ------------------------------------------ |
| UI Component      | PascalCase.tsx                             |
| Layout Component  | PascalCase.tsx                             |
| Forms             | PascalCase.tsx, CSS Modules with same name |
| Feedback / Modals | PascalCase.tsx                             |

**Example:**

components/ ui/ Button.tsx Card.tsx layout/ Header.tsx Footer.tsx
forms/Input.tsx

---

# 4. `features/` Folder – Domain Logic

| File / Type    | Naming / Convention                 |
| -------------- | ----------------------------------- |
| Feature folder | kebab-case                          |
| Components     | PascalCase.tsx inside `components/` |
| Hooks          | hooks.ts or useCamelCase.ts         |
| API / Service  | api.ts                              |
| Types          | types.ts                            |

**Example:**

features/blog/ api.ts hooks.ts types.ts components/ PostCard.tsx PostList.tsx

---

# 5. `hooks/` – Global Hooks

| Hook                       | Naming / Convention |
| -------------------------- | ------------------- |
| useDebounce.ts             | `useCamelCase`      |
| useLocalStorage.ts         | `useCamelCase`      |
| useIntersectionObserver.ts | `useCamelCase`      |

---

# 6. `lib/` – Utilities

| Utility       | Naming / Convention |
| ------------- | ------------------- |
| formatDate.ts | camelCase           |
| slugify.ts    | camelCase           |
| apiClient.ts  | camelCase           |

> Avoid duplicating code across features.

---

# 7. `types/` – TypeScript Types

| Type           | Naming / Convention |
| -------------- | ------------------- |
| User.ts        | PascalCase          |
| ApiResponse.ts | PascalCase          |
| Pagination.ts  | PascalCase          |

> Do **not** use `I` prefix for interfaces.

---

# 8. `styles/` – CSS

| Style             | Naming / Convention    |
| ----------------- | ---------------------- |
| Button.module.css | PascalCase.module.css  |
| Card.module.scss  | PascalCase.module.scss |
| globals.css       | lowercase, kebab-case  |

---

# 9. Imports & Aliases

- Always use **project aliases** (`@/`) instead of relative paths:

✅ Correct:

````ts
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/features/auth/hooks';
import { formatDate } from '@/lib/formatDate';

❌ Incorrect:

```ts
import { Button } from '../../../components/ui/Button';
````
`````

```

---

# 10. Dynamic Routes & Naming

| Folder / File | URL Example     | Naming                                  |
| ------------- | --------------- | --------------------------------------- |
| `[slug]`      | `/blog/my-post` | bracket notation                        |
| `[userId]`    | `/users/123`    | bracket notation                        |
| `(dashboard)` | `/dashboard`    | route group for layout                  |
| `_private`    | n/a             | internal folder, not exposed in routing |

---

# 11. Quick Naming Summary

| Type                             | Naming Rule                                |
| -------------------------------- | ------------------------------------------ |
| Folder                           | kebab-case                                 |
| React Component                  | PascalCase.tsx                             |
| Hooks                            | useCamelCase.ts                            |
| Utilities / Lib                  | camelCase.ts                               |
| TypeScript Types                 | PascalCase.ts                              |
| API / Services                   | camelCase.ts or feature.api.ts (preferred) |
| CSS Modules                      | PascalCase.module.css                      |
| Pages / Layout / Special Routing | page.tsx, layout.tsx, etc.                 |

---

# ✅ Notes for AI Agents

- Only generate **components outside `app/`**.
- Use **Server Components by default** unless interactivity is required.
- Always respect **folder + file naming conventions**.
- Follow **feature separation**: `features/` for domain logic, `components/` for
  UI.
- Use **`use`** for Promise values in Server Components and Context if is
  needed.
- Use barrel files only for UI components, global hooks, or small utility modules.
- Do not use barrels inside app/ or for domain logic that mixes server and client code.
-All source code should live inside the src/ folder. This keeps the project root clean and organizes code logically.
- Event handlers cannot be passed to Client Component props.
- If you need interactivity, consider converting part of this to a Client Component.
- If you use `next/dynamic`, `ssr: false` is not allowed with `next/dynamic` in Server Components. Please move it into a Client Component.

```
