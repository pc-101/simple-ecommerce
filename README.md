# E-Commerce Storefront (Next.js App Router)

A Next.js 16 project that showcases a headless-friendly storefront: faceted catalog search, persisted cart drawer, and credential-based authentication before checkout. It ships with Tailwind CSS styling, server actions via the App Router, and sensible defaults for hosting on Vercel or any Node runtime.

## Features

- **Catalog filtering** – Search by title, category, max price, or sort order via `/api/products`, keeping client-side filters fast and URL addressable.
- **Persisted cart** – Client cart state lives in a small Zustand store persisted to `localStorage`, exposed through a dynamically imported drawer to keep the main bundle lean.
- **Authentication gate** – NextAuth Credentials provider with a demo account protects the checkout route and drives the nav sign-in/sign-out controls.
- **Optimized UI** – Tailwind CSS design system, `next/image` remote patterns, and a sticky navbar to keep navigation and the cart accessible on all viewports.
- **Type-safe data** – Shared `Product` types feed the API route, cart store, and UI components to avoid duplicated shape definitions.
- **Production-ready defaults** – ESLint, TypeScript, and environment-driven URLs so server and browser fetches work both locally and when deployed.

## Prerequisites

- Node.js 18.18+ (matches the Next.js 16 requirement).
- `pnpm` installed globally (feel free to swap in `npm`/`yarn`, adjusting the commands).

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Copy the environment template and tweak the values:
   ```bash
   cp .env.example .env.local
   # set NEXTAUTH_SECRET to any random string
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
4. Visit `http://localhost:3000`. Use the built-in demo credentials (`demo@demo.com` / `demo123`) to sign in and unlock checkout.

## Available Scripts

- `pnpm dev` – Run Next.js in development with hot reloading.
- `pnpm build` – Create an optimized production build.
- `pnpm start` – Serve the build output in production mode.
- `pnpm lint` – Execute ESLint using the Next.js recommended config.

## Project Structure

```
app/
  layout.tsx          # Root layout + NextAuth provider + navbar
  page.tsx            # Landing page with quick links
  catalog/page.tsx    # Catalog grid with filter sidebar
  checkout/page.tsx   # Auth-protected checkout summary
  signin/page.tsx     # Credential sign-in form
  api/
    products/route.ts # In-memory product filtering API
    auth/[...nextauth]/route.ts # NextAuth handler
components/
  NavBar.tsx          # Sticky header with auth + cart controls
  Filters.tsx         # Client component that syncs filters to the URL
  ProductCard.tsx     # Catalog card with price + rating display
  cart/CartDrawer.tsx # Dynamically imported cart drawer UI
store/
  cart.ts             # Zustand store with persistence helpers
data/
  products.ts         # Mock product catalog shared by API/UI
lib/
  auth.ts             # NextAuth configuration
```

## Environment Variables

| Name                | Required | Description                                                                                 |
|---------------------|----------|---------------------------------------------------------------------------------------------|
| `NEXTAUTH_SECRET`   | Yes      | Secret used by NextAuth when signing JWTs; generate a random string for local development.  |
| `NEXT_PUBLIC_BASE_URL` | Yes   | Absolute origin used by client/server fetches (e.g., `http://localhost:3000`).             |
| `NEXT_BASE_URL`     | No       | Override the server-side base URL if it differs from the public value (useful on proxies).  |

> Note: When deploying to Vercel, you typically set `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, and `NEXT_PUBLIC_BASE_URL` in the project settings. `NEXT_BASE_URL` is only needed if the server must access the API through a different host than browsers.

## Architecture Notes

- **Catalog data flow** – The `/catalog` route converts the URL query into a server-side fetch against `/api/products`, ensuring filters are easily shareable while keeping the catalog fully static-cache friendly.
- **Cart + checkout** – The cart drawer uses a persisted Zustand slice to retain items between sessions. Checkout reads directly from this store but blocks rendering until `useSession` confirms the user is authenticated.
- **Auth UX** – `NavBar` uses `next-auth/react` to show sign-in/out buttons, and the sign-in page is prefilled with the demo credentials so QA teams can get in immediately.
- **Styling** – Tailwind utility classes (see `app/globals.css` and `tailwind.config.ts`) provide consistent “btn”, “card”, and “input” primitives for rapid skinning.

Have fun extending the storefront—swap in a real product feed, wire payments, or connect to a CMS when you’re ready for the next iteration.
