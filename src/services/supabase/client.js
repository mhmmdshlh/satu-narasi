import { createClient } from '@supabase/supabase-js';

const supabase_URL = import.meta.env.VITE_SUPABASE_URL;
const supabase_anon_key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabase_URL, supabase_anon_key);
