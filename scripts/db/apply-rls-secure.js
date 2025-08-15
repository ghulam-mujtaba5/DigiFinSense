#!/usr/bin/env node
/*
  Applies user-scoped RLS policies (secure) to Supabase Postgres.
  Usage:
    - Set DATABASE_URL env var
    - Run: npm run db:secure
*/

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const ROOT = path.resolve(__dirname, '../../..');
const SQL_FILE = path.join(ROOT, 'docs', 'db', 'rls_user_scoped.sql');

// Load env from .env.local first, then .env
try {
  const dotenv = require('dotenv');
  const envLocal = path.join(ROOT, '.env.local');
  const envDefault = path.join(ROOT, '.env');
  if (fs.existsSync(envLocal)) dotenv.config({ path: envLocal });
  if (fs.existsSync(envDefault)) dotenv.config({ path: envDefault });
} catch {}

async function main() {
  const connStr = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
  if (!connStr) {
    console.error('[ERROR] DATABASE_URL env var not set.');
    process.exit(1);
  }
  // Strip sslmode from URL if present and force SSL via pg options
  const connectionString = connStr.replace(/([?&])sslmode=[^&]+&?/i, '$1').replace(/[?&]$/, '');
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    console.log(`Applying ${path.relative(ROOT, SQL_FILE)} ...`);
    const sql = fs.readFileSync(SQL_FILE, 'utf8');
    await client.query(sql);
    console.log('✔ Secure RLS applied.');
  } catch (err) {
    console.error('[SQL ERROR]', err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
