import 'react-native-url-polyfill/auto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { PostgrestError } from '@supabase/supabase-js';

// Load local secrets (git-ignored). This file is created locally as `.secrets.local.ts`.
// It should provide SUPABASE_URL and SUPABASE_ANON_KEY for client-side usage.
let SUPABASE_URL = '';
let SUPABASE_ANON_KEY = '';

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { SECRETS } = require('./.secrets.local');
  SUPABASE_URL = SECRETS.SUPABASE_URL || '';
  SUPABASE_ANON_KEY = SECRETS.SUPABASE_ANON_KEY || '';
  // NOTE: SECRETS.SUPABASE_DB_PASSWORD must NEVER be used in the mobile client.
} catch (e) {
  // No local secrets; leave values empty. Callers must handle missing config.
}

let supabase: SupabaseClient | null = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

export { supabase, SUPABASE_URL, SUPABASE_ANON_KEY };
export type { PostgrestError };
