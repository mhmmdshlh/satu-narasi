-- ============================================
-- Role Management untuk Admin
-- ============================================

-- Kolom role sudah ditambahkan di supabase-setup.sql
-- File ini hanya untuk RLS policies tambahan

-- 1. RLS: Admin bisa update semua laporan (approve/reject)
CREATE POLICY "Admins can update any report"
  ON public.citizen_reports
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- 2. RLS: Admin bisa hapus diskusi
CREATE POLICY "Admins can delete discussions"
  ON public.discussions
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- 3. RLS: Admin bisa hapus komentar
CREATE POLICY "Admins can delete comments"
  ON public.comments
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );