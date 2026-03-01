-- ============================================
-- Citizen Reports (Forum Laporan Warga)
-- ============================================

-- 1. Create citizen_reports table
CREATE TABLE IF NOT EXISTS public.citizen_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT, -- opsional
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE public.citizen_reports ENABLE ROW LEVEL SECURITY;

-- Policy: Semua bisa lihat laporan yang approved
CREATE POLICY "Approved reports are viewable by everyone"
  ON public.citizen_reports
  FOR SELECT
  USING (status = 'approved' OR auth.uid() = author_id);

-- Policy: User yang login bisa submit laporan
CREATE POLICY "Authenticated users can submit reports"
  ON public.citizen_reports
  FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Policy: Author bisa update laporan sendiri (selagi masih pending)
CREATE POLICY "Authors can update own pending reports"
  ON public.citizen_reports
  FOR UPDATE
  USING (auth.uid() = author_id AND status = 'pending');

-- 3. Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_report_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_report_updated ON public.citizen_reports;
CREATE TRIGGER on_report_updated
  BEFORE UPDATE ON public.citizen_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_report_updated_at();

-- 4. Index
CREATE INDEX IF NOT EXISTS citizen_reports_author_id_idx ON public.citizen_reports(author_id);
CREATE INDEX IF NOT EXISTS citizen_reports_status_idx ON public.citizen_reports(status);
CREATE INDEX IF NOT EXISTS citizen_reports_created_at_idx ON public.citizen_reports(created_at DESC);

-- ============================================
-- Storage bucket untuk gambar laporan
-- ============================================

-- Buat bucket (jalankan via Supabase dashboard atau API, bukan SQL murni)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('report-images', 'report-images', true)
-- ON CONFLICT DO NOTHING;

-- Storage policy: siapa pun bisa lihat gambar (public bucket)
-- storage.objects: user yang login bisa upload ke folder user_id mereka sendiri
CREATE POLICY "Report images are publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'report-images');

CREATE POLICY "Authenticated users can upload report images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'report-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete own report images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'report-images' AND auth.uid()::text = (storage.foldername(name))[1]);
