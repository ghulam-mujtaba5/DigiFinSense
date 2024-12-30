//src\services\supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://woqsgkjsrkgrrctgrbfw.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvcXNna2pzcmtncnJjdGdyYmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0MTMxMzIsImV4cCI6MjA1MDk4OTEzMn0.3sNDCFACI9zcAxUEHrER-o-ZLGQaoNoPZXx-mfmLnog';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
