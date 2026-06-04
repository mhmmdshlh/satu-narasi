import { supabase } from "../supabase/client";

export const getAllReports = async (status = null) => {
    let query = supabase
        .from('citizen_reports')
        .select('*, author:profiles(username, full_name)')
        .order('created_at', { ascending: false });

    if (status) {
        query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
};

export const approveReport = async (id) => {
    const { error } = await supabase
        .from('citizen_reports')
        .update({ status: 'approved' })
        .eq('id', id);

    if (error) throw error;
};

export const rejectReport = async (id) => {
    const { error } = await supabase
        .from('citizen_reports')
        .update({ status: 'rejected' })
        .eq('id', id);

    if (error) throw error;
};

export const getAllDiscussions = async () => {
    const { data, error } = await supabase
        .from('discussions_with_details')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};

export const getAllComments = async (discussionId) => {
    const { data, error } = await supabase
        .from('comments')
        .select('*, author:profiles(username, full_name)')
        .eq('discussion_id', discussionId)
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
};

export const getAdminStats = async () => {
    const [
        { count: totalUsers },
        { count: totalReports },
        { count: pendingReports },
        { count: approvedReports },
        { count: rejectedReports },
        { count: totalDiscussions },
        { count: totalComments },
    ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('citizen_reports').select('*', { count: 'exact', head: true }),
        supabase.from('citizen_reports').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('citizen_reports').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
        supabase.from('citizen_reports').select('*', { count: 'exact', head: true }).eq('status', 'rejected'),
        supabase.from('discussions').select('*', { count: 'exact', head: true }),
        supabase.from('comments').select('*', { count: 'exact', head: true }),
    ]);

    return {
        totalUsers: totalUsers ?? 0,
        totalReports: totalReports ?? 0,
        pendingReports: pendingReports ?? 0,
        approvedReports: approvedReports ?? 0,
        rejectedReports: rejectedReports ?? 0,
        totalDiscussions: totalDiscussions ?? 0,
        totalComments: totalComments ?? 0,
    };
};
