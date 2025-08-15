-- User-scoped RLS policies (replace permissive dev policies before production)
-- Assumes rows carry user_id column set to auth.uid() on insert.

-- Enable RLS (already enabled in schema.sql, but safe):
alter table public.assets enable row level security;
alter table public.transactions enable row level security;
alter table public.budgets enable row level security;

-- Drop dev policies if present
-- (You can run DROP POLICY IF EXISTS safely; ignore warnings if not found)
drop policy if exists "dev_assets_select_all" on public.assets;
drop policy if exists "dev_assets_insert_all" on public.assets;
drop policy if exists "dev_assets_update_all" on public.assets;
drop policy if exists "dev_assets_delete_all" on public.assets;

drop policy if exists "dev_transactions_select_all" on public.transactions;
drop policy if exists "dev_transactions_insert_all" on public.transactions;
drop policy if exists "dev_transactions_update_all" on public.transactions;
drop policy if exists "dev_transactions_delete_all" on public.transactions;

drop policy if exists "dev_budgets_select_all" on public.budgets;
drop policy if exists "dev_budgets_insert_all" on public.budgets;
drop policy if exists "dev_budgets_update_all" on public.budgets;
drop policy if exists "dev_budgets_delete_all" on public.budgets;

-- Assets: owner-only access
create policy if not exists "assets_select_owner" on public.assets
for select using (auth.uid() = user_id);
create policy if not exists "assets_insert_owner" on public.assets
for insert with check (auth.uid() = user_id);
create policy if not exists "assets_update_owner" on public.assets
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy if not exists "assets_delete_owner" on public.assets
for delete using (auth.uid() = user_id);

-- Transactions: owner-only
create policy if not exists "transactions_select_owner" on public.transactions
for select using (auth.uid() = user_id);
create policy if not exists "transactions_insert_owner" on public.transactions
for insert with check (auth.uid() = user_id);
create policy if not exists "transactions_update_owner" on public.transactions
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy if not exists "transactions_delete_owner" on public.transactions
for delete using (auth.uid() = user_id);

-- Budgets: owner-only
create policy if not exists "budgets_select_owner" on public.budgets
for select using (auth.uid() = user_id);
create policy if not exists "budgets_insert_owner" on public.budgets
for insert with check (auth.uid() = user_id);
create policy if not exists "budgets_update_owner" on public.budgets
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy if not exists "budgets_delete_owner" on public.budgets
for delete using (auth.uid() = user_id);
