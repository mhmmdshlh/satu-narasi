import { supabase } from "../supabase/client";

const authErrorMap = {
    "Invalid login credentials": "Email atau password salah. Silakan coba lagi.",
    "Email not confirmed": "Email belum diverifikasi. Cek kotak masuk email kamu.",
    "User already registered": "Email sudah terdaftar. Silakan login atau gunakan email lain.",
    "Password should be at least 6 characters": "Password minimal 6 karakter.",
    "Invalid email": "Format email tidak valid.",
    "Email rate limit exceeded": "Terlalu banyak percobaan. Tunggu beberapa saat dan coba lagi.",
    "Token has expired or is invalid": "Sesi berakhir. Silakan login ulang.",
};

export const translateAuthError = (error) => {
    const msg = error?.message || error || "Terjadi kesalahan. Silakan coba lagi.";
    return authErrorMap[msg] || msg;
};

// Login dengan email dan password
export const signInWithEmail = async (email, password, remember = true) => {
    sessionStorage.setItem('sb-remember', remember ? 'true' : 'false');

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        sessionStorage.removeItem('sb-remember');
        throw error;
    }

    return data;
};

// Sign up dengan email dan password
export const signUpWithEmail = async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: metadata // username, full_name, avatar_url akan masuk ke raw_user_meta_data
        }
    });

    if (error) {
        throw error;
    }

    return data;
};

// Login dengan Google OAuth
export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/`,
        }
    });

    if (error) {
        throw error;
    }

    return data;
};

// Logout
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw error;
    }
};

// Get current user
export const getCurrentUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        throw error;
    }

    return user;
};

// Get current session
export const getSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
        throw error;
    }

    return session;
};
