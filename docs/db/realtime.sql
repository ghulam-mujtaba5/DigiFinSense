-- Enable Realtime for tables (Supabase Realtime listens via a publication)
-- Run this after creating tables. Safe to run multiple times.

-- Make sure rows emit full changes for UPDATE/DELETE
alter table public.assets replica identity full;
alter table public.transactions replica identity full;
alter table public.budgets replica identity full;

-- Add tables to the realtime publication
create publication if not exists supabase_realtime;
alter publication supabase_realtime add table public.assets;
alter publication supabase_realtime add table public.transactions;
alter publication supabase_realtime add table public.budgets;
