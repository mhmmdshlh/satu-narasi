import { supabase } from "../supabase/client";

export const getStatJabar = async () => {
    const { data, error } = await supabase
        .from("stat_jabar")
        .select("*")
        .order('tahun', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        console.error("Error fetching dashboard data:", error);
        return null;
    }

    // Map ke format yang dibutuhkan Dashboard
    return {
        tahun: data.tahun,
        jml_penduduk: data.jumlah_penduduk,
        jml_kabkota: data.kabkota,
        pertumbuhan_ekonomi: data.pertumbuhan_ekonomi.toFixed(2)
    };
};
