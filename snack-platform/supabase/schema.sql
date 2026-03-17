-- Enable the UUID extension
create extension if not exists "uuid-ossp";

-- USERS (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users not null primary key,
  role text check (role in ('parent', 'student', 'school', 'admin')) default 'parent',
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for users
alter table public.users enable row level security;
create policy "Users can view their own profile." on public.users for select using (auth.uid() = id);
create policy "Users can update their own profile." on public.users for update using (auth.uid() = id);

-- SCHOOLS
create table public.schools (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  address text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for schools
alter table public.schools enable row level security;
create policy "Anyone can view active schools." on public.schools for select using (is_active = true);

-- PRODUCTS
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price numeric(10, 2) not null,
  image_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for products
alter table public.products enable row level security;
create policy "Anyone can view active products." on public.products for select using (is_active = true);

-- ORDERS
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  school_id uuid references public.schools(id) not null,
  status text check (status in ('pending', 'paid', 'delivered', 'cancelled')) default 'pending',
  total_amount numeric(10, 2) not null,
  stripe_session_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for orders
alter table public.orders enable row level security;
create policy "Users can view their own orders." on public.orders for select using (auth.uid() = user_id);
create policy "Users can insert their own orders." on public.orders for insert with check (auth.uid() = user_id);

-- ORDER ITEMS
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) not null,
  quantity integer not null,
  price_at_time numeric(10, 2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for order items
alter table public.order_items enable row level security;
create policy "Users can view their own order items." on public.order_items for select using (
  exists (
    select 1 from public.orders
    where orders.id = order_items.order_id
    and orders.user_id = auth.uid()
  )
);
create policy "Users can insert their own order items." on public.order_items for insert with check (
  exists (
    select 1 from public.orders
    where orders.id = order_items.order_id
    and orders.user_id = auth.uid()
  )
);

-- Set up Realtime for orders
alter publication supabase_realtime add table orders;
