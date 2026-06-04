import { createClient } from '@supabase/supabase-js';

const supabase_URL = import.meta.env.VITE_SUPABASE_URL;
const supabase_anon_key = import.meta.env.VITE_SUPABASE_ANON_KEY;

const rememberStorage = {
    getItem(key) {
        if (sessionStorage.getItem('sb-remember') === 'false') {
            const val = sessionStorage.getItem(key);
            if (val) return val;
        }
        return localStorage.getItem(key);
    },
    setItem(key, value) {
        if (sessionStorage.getItem('sb-remember') === 'false') {
            sessionStorage.setItem(key, value);
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, value);
            sessionStorage.removeItem(key);
        }
    },
    removeItem(key) {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
    },
};

export const supabase = createClient(supabase_URL, supabase_anon_key, {
    auth: { storage: rememberStorage },
});
