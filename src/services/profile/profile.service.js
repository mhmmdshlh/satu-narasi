import { supabase } from "../supabase/client";

// Get profile by user ID
export const getProfile = async (userId) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        throw error;
    }

    return data;
};

// Get profile by username
export const getProfileByUsername = async (username) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

    if (error) {
        throw error;
    }

    return data;
};

// Update own profile
export const updateProfile = async (userId, updates) => {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
};

// Get all profiles (untuk user list, forum, dll)
export const getAllProfiles = async () => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        throw error;
    }

    return data;
};
