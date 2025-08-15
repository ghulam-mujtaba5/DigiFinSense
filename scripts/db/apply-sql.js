#!/usr/bin/env node
/*
  Applies project SQL files to Supabase Postgres.
  Usage:
    - Set DATABASE_URL env var to your Supabase Postgres connection string
      e.g. postgres://postgres:<password>@db.<ref>.supabase.co:5432/postgres?sslmode=require
    - Run: npm run db:apply
*/

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const ROOT = path.resolve(__dirname, '../../..');
const SQL_DIR = path.join(ROOT, 'docs', 'db');

// Load env from .env.local first, then .env
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const dotenv = require('dotenv');
  const envLocal = path.join(ROOT, '.env.local');
  const envDefault = path.join(ROOT, '.env');
  if (fs.existsSync(envLocal)) dotenv.config({ path: envLocal });
  if (fs.existsSync(envDefault)) dotenv.config({ path: envDefault });
} catch {}
const FILES = ['schema.sql', 'seed.sql', 'realtime.sql'];

function readSql(p) {
  const sql = fs.readFileSync(p, 'utf8');
  return sql;
}

async function main() {
  const connStr = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
  if (!connStr) {
    console.error('[ERROR] DATABASE_URL env var not set.');
    console.error('Get it from Supabase: Project → Database → Connection string.');
    process.exit(1);
  }

  // Strip sslmode from URL if present and force SSL via pg options
  const connectionString = connStr.replace(/([?&])sslmode=[^&]+&?/i, '$1').replace(/[?&]$/, '');
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

  try {
    await client.connect();
    for (const file of FILES) {
      const full = path.join(SQL_DIR, file);
      console.log(`\n=== Applying ${path.relative(ROOT, full)} ===`);
      const sql = readSql(full);
      await client.query(sql);
      console.log(`✔ Done: ${file}`);
    }
    console.log('\nAll SQL applied successfully.');
  } catch (err) {
    console.error('\n[SQL ERROR]', err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
