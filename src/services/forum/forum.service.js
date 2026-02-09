import { supabase } from "../supabase/client";

// ========== DISCUSSIONS ==========

// Get all discussions dengan detail (author, votes, comments count)
export const getDiscussions = async (category = null) => {
    let query = supabase
        .from('discussions_with_details')
        .select('*')
        .order('created_at', { ascending: false });

    if (category) {
        query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
};

// Get single discussion by ID (without incrementing views)
export const getDiscussion = async (id) => {
    const { data, error } = await supabase
        .from('discussions_with_details')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

// Increment discussion views
export const incrementDiscussionViews = async (id) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return; // Guest tidak count view

    const { error } = await supabase.rpc('increment_discussion_views', {
        p_discussion_id: id,
        p_viewer_id: user.id
    });
    if (error) throw error;
};

// Create new discussion
export const createDiscussion = async (discussion) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('User must be logged in');

    const { data, error } = await supabase
        .from('discussions')
        .insert({
            ...discussion,
            author_id: user.id
        })
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Update discussion
export const updateDiscussion = async (id, updates) => {
    const { data, error } = await supabase
        .from('discussions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Delete discussion
export const deleteDiscussion = async (id) => {
    const { error } = await supabase
        .from('discussions')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// ========== COMMENTS ==========

// Get comments for a discussion
export const getComments = async (discussionId) => {
    const { data, error } = await supabase
        .from('comments')
        .select(`
            *,
            author:profiles(username, full_name, avatar_url)
        `)
        .eq('discussion_id', discussionId)
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
};

// Create comment
export const createComment = async (comment) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('User must be logged in');

    const { data, error } = await supabase
        .from('comments')
        .insert({
            ...comment,
            author_id: user.id
        })
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Update comment
export const updateComment = async (id, content) => {
    const { data, error } = await supabase
        .from('comments')
        .update({ content })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Delete comment
export const deleteComment = async (id) => {
    const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// ========== LIKES ==========

// Check if user has liked a discussion
export const getUserLike = async (discussionId) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const { data, error } = await supabase
        .from('discussion_likes')
        .select('id')
        .eq('discussion_id', discussionId)
        .eq('user_id', user.id)
        .maybeSingle();

    if (error) throw error;
    return !!data; // Return true if like exists
};

// Toggle like on discussion
export const toggleLike = async (discussionId) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('User must be logged in');

    // Check if user already liked
    const hasLiked = await getUserLike(discussionId);

    if (hasLiked) {
        // Remove like (unlike)
        const { error } = await supabase
            .from('discussion_likes')
            .delete()
            .eq('discussion_id', discussionId)
            .eq('user_id', user.id);

        if (error) throw error;
        return false; // unliked
    } else {
        // Add like
        const { error } = await supabase
            .from('discussion_likes')
            .insert({
                discussion_id: discussionId,
                user_id: user.id
            });

        if (error) throw error;
        return true; // liked
    }
};
