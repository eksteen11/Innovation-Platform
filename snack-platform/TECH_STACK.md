# TECH_STACK

## Core Technologies

### Framework
- **Next.js (v15+)**: Utilizing the new App Router (`app/` directory). Server Components for initial load speed, Client Components for interactive UI.

### Language
- **TypeScript**: Strict mode enabled for comprehensive type safety and autocomplete.

### Styling & UI
- **Tailwind CSS (v4)**: Utility-first CSS framework for rapid and consistent design execution. Configured with custom theme variables mapped to CSS custom properties in `globals.css`.
- **Framer Motion**: Production-ready animation library for React, utilized for high-quality, 60fps micro-interactions (e.g., cart additions, page transitions, modal reveals).
- **Lucide React**: Modern, consistent, open-source icon set.

### Database & Authentication
- **Supabase**: Open source Firebase alternative. Provides:
  - **PostgreSQL Database**: Scalable, relational data storage.
  - **Auth**: Built-in authentication (Email/Password, Socials if needed later).
  - **Storage**: For hosting product images.
  - **Row Level Security (RLS)**: Ensuring users only see/edit their own data (e.g., Orders).
- **@supabase/supabase-js**: Isomorphic JavaScript client for interacting with Supabase services.

### Payments
- **Stripe**: Leading payment infrastructure for the internet.
- **@stripe/stripe-js**: Stripe.js and Elements for React.
- **stripe (Node.js)**: Server-side Stripe integration for creating Checkout Sessions and handling webhooks safely via Next.js Route Handlers.

### Tooling
- **ESLint**: Linter setup with `eslint-config-next`.
- **Prettier**: Code formatting (to be added if team prefers, but default Next rules apply).
- **npm**: Package manager.