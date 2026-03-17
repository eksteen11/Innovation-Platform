# BILLION-DOLLAR DESIGN RULES

## Philosophy
Every feature must feel simple, trustworthy, fast, human, calm. Reduce friction and cognitive load. The primary user is parents and students on mobile devices.

## 1. Typography & Palette
- **Fonts**: Maximum 2 fonts. Clear hierarchy.
  - Primary (Headings): `--font-geist-sans`
  - Secondary (Body): `--font-geist-sans`
- **Palette**: Limited to soft neutrals + strong vibrant accent.
  - Background: Soft warm off-white (`#fdfbf7` / `--background`)
  - Foreground Text: Dark strong readable tone (`#2d2a26` / `--foreground`)
  - Primary Accent: Vibrant organic Mango/Apricot Orange (`#f26b3a` / `--primary`)
  - Secondary Accent: Soft green (`#8fb38b` / `--accent`)

## 2. Mobile-First UX (The Laws)
1. **Clear first impression in 3 seconds.**
2. **One main action per screen** (e.g., "Add to Cart", "Checkout").
3. **Strong visual hierarchy** using font weights, sizes, and spacing.
4. **Consistent spacing system** (Tailwind spacing scale `4`, `8`, `16`, `24`, `32`).
5. **Touch-friendly sizing**: All tap targets (buttons, inputs) must be at least `44x44px`.
6. **Fast perceived performance**: Use skeletons during data fetch.
7. **Calm layouts**: Generous padding, no clutter. Grid-based.
8. **Micro-interactions**: Use `framer-motion` for subtle, satisfying feedback (e.g., adding to cart).
9. **Predictable navigation**: Sticky bottom nav on mobile or clear back buttons.
10. **Kind error states**: Explain what went wrong and how to fix it gently.

## 3. Code Output Format
- Maintain small, focused components.
- Exactly ONE return (`(...)`) for JSX.
- Wrap all JSX inside semantic HTML or `<></>`.
- No dangling parentheses or stray text nodes.
- Maintain consistent error handling loops as per the Build Constitution.