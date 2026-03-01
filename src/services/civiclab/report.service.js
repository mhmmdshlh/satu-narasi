import { supabase } from "../supabase/client";

// Ambil semua laporan milik user yang sedang login
export const getUserReports = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from("citizen_reports")
        .select("*")
        .eq("author_id", user.id)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
};

// Ambil total laporan yang sudah approved (untuk dashboard)
export const getTotalApprovedReports = async () => {
    const { count, error } = await supabase
        .from("citizen_reports")
        .select("*", { count: "exact", head: true })
        .eq("status", "approved");

    if (error) throw error;
    return count ?? 0;
};

// Ambil semua laporan yang sudah approved (untuk popup publik)
export const getApprovedReports = async () => {
    const { data, error } = await supabase
        .from("citizen_reports")
        .select("*, author:profiles(username, full_name)")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
};

const MAX_FILE_SIZE_MB = 5;
const COMPRESS_MAX_WIDTH = 1280;
const COMPRESS_QUALITY = 0.8;

// Kompres gambar menggunakan Canvas API, output selalu JPEG
const compressImage = (file) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);

            // Hitung dimensi baru proporsional, max lebar COMPRESS_MAX_WIDTH
            let { width, height } = img;
            if (width > COMPRESS_MAX_WIDTH) {
                height = Math.round((height * COMPRESS_MAX_WIDTH) / width);
                width = COMPRESS_MAX_WIDTH;
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (!blob) return reject(new Error("Gagal mengompres gambar."));
                    resolve(new File([blob], "compressed.jpg", { type: "image/jpeg" }));
                },
                "image/jpeg",
                COMPRESS_QUALITY
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Gagal membaca file gambar."));
        };

        img.src = objectUrl;
    });
};

// Upload gambar ke Supabase Storage, return public URL
const uploadReportImage = async (file, userId) => {
    // Validasi ukuran sebelum diproses
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        throw new Error(`Ukuran foto maksimal ${MAX_FILE_SIZE_MB}MB.`);
    }

    // Kompres dulu
    const compressed = await compressImage(file);

    const path = `${userId}/${Date.now()}.jpg`;

    const { error } = await supabase.storage
        .from("report-images")
        .upload(path, compressed, { upsert: false, contentType: "image/jpeg" });

    if (error) throw error;

    const { data } = supabase.storage
        .from("report-images")
        .getPublicUrl(path);

    return data.publicUrl;
};

// Submit laporan baru, dengan validasi bisnis:
// - Hanya 1 laporan per hari
// - Tidak boleh ada laporan yang masih pending
export const submitReport = async ({ title, description, category, location, imageFile }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Kamu harus login untuk mengirim laporan.");

    // Cek apakah ada laporan pending
    const { data: pendingReports, error: pendingError } = await supabase
        .from("citizen_reports")
        .select("id")
        .eq("author_id", user.id)
        .eq("status", "pending")
        .limit(1);

    if (pendingError) throw pendingError;
    if (pendingReports.length > 0) {
        throw new Error("Kamu masih memiliki laporan yang sedang menunggu persetujuan. Tunggu hingga diproses sebelum mengirim laporan baru.");
    }

    // Cek apakah sudah kirim laporan hari ini
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const { data: todayReports, error: todayError } = await supabase
        .from("citizen_reports")
        .select("id")
        .eq("author_id", user.id)
        .gte("created_at", startOfDay.toISOString())
        .limit(1);

    if (todayError) throw todayError;
    if (todayReports.length > 0) {
        throw new Error("Kamu hanya bisa mengirim 1 laporan per hari.");
    }

    // Upload gambar kalau ada
    let image_url = null;
    if (imageFile) {
        image_url = await uploadReportImage(imageFile, user.id);
    }

    // Insert laporan
    const { data, error } = await supabase
        .from("citizen_reports")
        .insert({
            author_id: user.id,
            title,
            description,
            category,
            location,
            image_url,
            status: "pending",
        })
        .select()
        .single();

    if (error) throw error;
    return data;
};
