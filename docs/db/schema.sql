-- DigiFinSense Supabase Schema (DEV)
-- Note: This enables permissive RLS policies for development/testing.
-- Tighten policies before production.

-- Extensions (uuid generation)
create extension if not exists "uuid-ossp";

-- Profiles table (optional linkage to auth.users)
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- Assets held by a user
create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  ticker text,
  amount numeric not null default 0,
  value numeric not null default 0,
  change numeric not null default 0,
  icon text,
  created_at timestamptz not null default now()
);
create index if not exists idx_assets_user_id on public.assets(user_id);
alter table public.assets enable row level security;

-- Personal finance transactions
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  description text not null,
  amount numeric not null,
  date date not null,
  type text not null check (type in ('income','expense')),
  category text,
  created_at timestamptz not null default now()
);
create index if not exists idx_transactions_user_id on public.transactions(user_id);
create index if not exists idx_transactions_date on public.transactions(date);
alter table public.transactions enable row level security;

-- Budgets per user/category (optionally per month)
create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  category text not null,
  limit_amount numeric not null,
  spent numeric not null default 0,
  month date,
  created_at timestamptz not null default now()
);
create index if not exists idx_budgets_user_id on public.budgets(user_id);
create index if not exists idx_budgets_month on public.budgets(month);
alter table public.budgets enable row level security;

-- DEVELOPMENT RLS (Permissive: anon can read/write)
-- Replace with user-scoped policies before production.

-- profiles RLS
drop policy if exists "dev_profiles_select_all" on public.profiles;
create policy "dev_profiles_select_all" on public.profiles
for select using (true);
drop policy if exists "dev_profiles_insert_all" on public.profiles;
create policy "dev_profiles_insert_all" on public.profiles
for insert with check (true);
drop policy if exists "dev_profiles_update_all" on public.profiles;
create policy "dev_profiles_update_all" on public.profiles
for update using (true) with check (true);
drop policy if exists "dev_profiles_delete_all" on public.profiles;
create policy "dev_profiles_delete_all" on public.profiles
for delete using (true);

-- assets RLS
drop policy if exists "dev_assets_select_all" on public.assets;
create policy "dev_assets_select_all" on public.assets
for select using (true);
drop policy if exists "dev_assets_insert_all" on public.assets;
create policy "dev_assets_insert_all" on public.assets
for insert with check (true);
drop policy if exists "dev_assets_update_all" on public.assets;
create policy "dev_assets_update_all" on public.assets
for update using (true) with check (true);
drop policy if exists "dev_assets_delete_all" on public.assets;
create policy "dev_assets_delete_all" on public.assets
for delete using (true);

-- transactions RLS
drop policy if exists "dev_transactions_select_all" on public.transactions;
create policy "dev_transactions_select_all" on public.transactions
for select using (true);
drop policy if exists "dev_transactions_insert_all" on public.transactions;
create policy "dev_transactions_insert_all" on public.transactions
for insert with check (true);
drop policy if exists "dev_transactions_update_all" on public.transactions;
create policy "dev_transactions_update_all" on public.transactions
for update using (true) with check (true);
drop policy if exists "dev_transactions_delete_all" on public.transactions;
create policy "dev_transactions_delete_all" on public.transactions
for delete using (true);

-- budgets RLS
drop policy if exists "dev_budgets_select_all" on public.budgets;
create policy "dev_budgets_select_all" on public.budgets
for select using (true);
drop policy if exists "dev_budgets_insert_all" on public.budgets;
create policy "dev_budgets_insert_all" on public.budgets
for insert with check (true);
drop policy if exists "dev_budgets_update_all" on public.budgets;
create policy "dev_budgets_update_all" on public.budgets
for update using (true) with check (true);
drop policy if exists "dev_budgets_delete_all" on public.budgets;
create policy "dev_budgets_delete_all" on public.budgets
for delete using (true);
