import { supabase } from "../supabase/client";

// Login dengan email dan password
export const signInWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
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
