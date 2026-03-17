# PROJECT_PLAN

## Name
Dried Fruit Snack Platform

## Overview
A modern, mobile-first e-commerce web application for ordering dried fruit snack bags. Designed for parents, students, and schools to seamlessly order snacks that are delivered directly to specific schools for student pickup.

## Phased Approach

### Phase 1: Foundation
- Bootstrap Next.js project
- Configure Tailwind CSS & Design tokens
- Create project documentation (`PROJECT_PLAN.md`, `DESIGN_RULES.md`, `TECH_STACK.md`)

### Phase 2: Backend Services (Supabase)
- Setup Authentication (Email/Password)
- Provision Database Tables:
  - `products` (id, name, description, price, image_url)
  - `schools` (id, name, address, active)
  - `users` (id, role: parent/student/school)
  - `orders` (id, user_id, school_id, status, total_amount)
  - `order_items` (id, order_id, product_id, quantity, price_at_time)
- Implement Row Level Security (RLS)

### Phase 3: Frontend Store (UI/UX)
- Build the Product Catalog (grid layout, touch-friendly)
- Implement Cart State (Zustand or React Context)
- Add Framer Motion micro-interactions (add to cart animation)

### Phase 4: Checkout & Integration
- School-pickup selection UI
- Stripe Payment integration (Checkout sessions)
- Order confirmation and success states

### Phase 5: Polish & Admin
- Basic dashboard for schools to view pending orders/deliveries
- Final accessibility and performance audit