-- DigiFinSense seed data for development
-- Safe to run multiple times (uses explicit IDs to avoid duplicates if desired)

-- Optional demo profile
insert into public.profiles (email)
values ('demo@digifinsense.local')
on conflict do nothing;

-- Assets
insert into public.assets (name, ticker, amount, value, change, icon)
values
  ('Bitcoin', 'BTC', 0.5, 45000, 2.5, 'https://img.icons8.com/fluency/48/bitcoin.png'),
  ('Ethereum', 'ETH', 10, 3000, -1.2, 'https://img.icons8.com/fluency/48/ethereum.png'),
  ('Tesla', 'TSLA', 15, 300, 5.1, 'https://img.icons8.com/fluency/48/tesla.png');

-- Transactions
insert into public.transactions (description, amount, date, type, category)
values
  ('Salary', 5000, '2024-07-01', 'income', 'Income'),
  ('Rent', 1500, '2024-07-02', 'expense', 'Housing'),
  ('Groceries', 250, '2024-07-03', 'expense', 'Food');

-- Budgets
insert into public.budgets (category, limit_amount, spent, month)
values
  ('Food', 500, 250, '2024-07-01'),
  ('Shopping', 300, 350, '2024-07-01');
