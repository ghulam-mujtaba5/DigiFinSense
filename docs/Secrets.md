# Secrets and Environment Configuration

This app is a React Native client. Never embed server credentials (like a raw Postgres DB password) in the mobile app.

## Supabase credentials
- Client-side (mobile app) should only use:
  - SUPABASE_URL
  - SUPABASE_ANON_KEY
- Server-side (backend/Edge Functions) may use:
  - Database connection string (which includes the DB password)

## Files
- `source/config/.secrets.local.ts` (git-ignored): Local-only secrets for development.
- `source/config/.secrets.example.ts`: Template (safe to commit).
- `source/config/supabase.ts`: Loads URL/key from `.secrets.local.ts` and creates the Supabase client.

## Provided values
- Supabase DB password: `WyXf8xLgk3yBNHv@`
  - NOTE: If you craft a Postgres URL, you must percent-encode special characters (e.g., `@` → `%40`).
  - Example: `postgres://user:WyXf8xLgk3yBNHv%40@host:6543/dbname`

## Setup for local development
1. Copy the example file:
   - `cp source/config/.secrets.example.ts source/config/.secrets.local.ts`
2. Fill in the fields in `.secrets.local.ts`:
   - `SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co"`
   - `SUPABASE_ANON_KEY = "YOUR_ANON_PUBLIC_KEY"`
   - Keep `SUPABASE_DB_PASSWORD` only if you also run a local backend (the mobile client will not use it).
3. Rebuild the app (or reload Metro) after changes.

## Why not store DB password in the app?
- Mobile apps are distributable—any embedded secret can be extracted.
- Use Supabase Row Level Security and the anon/public key in the app.
- Use service role or DB password only in trusted server code.

## Using from code
- Import the client from `source/config/supabase.ts`:
```ts
import { supabase } from 'source/config/supabase';

async function example() {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.from('profiles').select('*');
}
```



Project name

Project ID
cadvceywcwugkfpcmimm
Project API
Your API is secured behind an API gateway which requires an API Key for every request.
You can use the parameters below to use Supabase client libraries.
Project URL
Copy

A RESTful endpoint for querying and managing your database.
API Key
anonpublic
Copy

This key is safe to use in a browser if you have enabled Row Level Security (RLS) for your tables and configured policies. You may also use the service key which can be found here to bypass RLS.
Javascript
Dart
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://cadvceywcwugkfpcmimm.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


https://cadvceywcwugkfpcmimm.supabase.co


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhZHZjZXl3Y3d1Z2tmcGNtaW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNzE1NzYsImV4cCI6MjA3MDg0NzU3Nn0.MhB5AKh869km23D_gg8x4N8tuwNBwCU3VhVwumHbEIg


ghulammujatab0454
Free
ghulammujatab0454
Project name
Database Password  WyXf8xLgk3yBNHv@
Copy
Note: If using the Postgres connection string, you will need to percent-encode the password
This password is strong. Generate a password

this is supbase db creadinatial use it ad store it also 


