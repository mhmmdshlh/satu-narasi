-- ============================================
-- FORUM SYSTEM SETUP
-- ============================================

-- 1. Create discussions table (topik forum)
CREATE TABLE IF NOT EXISTS public.discussions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT, -- 'general', 'question', 'announcement', dll
  views INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE, -- untuk nested replies
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create likes table (like untuk discussions)
CREATE TABLE IF NOT EXISTS public.discussion_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(discussion_id, user_id) -- User hanya bisa like 1x per discussion
);

-- 4. Create discussion_views table (track siapa yang sudah view discussion)
CREATE TABLE IF NOT EXISTS public.discussion_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(discussion_id, user_id)
);

-- 5. Enable RLS untuk discussions
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa lihat discussions
CREATE POLICY "Discussions are viewable by everyone"
  ON public.discussions
  FOR SELECT
  USING (true);

-- Policy: User yang login bisa create discussion
CREATE POLICY "Authenticated users can create discussions"
  ON public.discussions
  FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Policy: Author bisa update discussion sendiri
CREATE POLICY "Users can update own discussions"
  ON public.discussions
  FOR UPDATE
  USING (auth.uid() = author_id);

-- Policy: Author bisa delete discussion sendiri
CREATE POLICY "Users can delete own discussions"
  ON public.discussions
  FOR DELETE
  USING (auth.uid() = author_id);

-- 6. Enable RLS untuk comments
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa lihat comments
CREATE POLICY "Comments are viewable by everyone"
  ON public.comments
  FOR SELECT
  USING (true);

-- Policy: User yang login bisa create comment
CREATE POLICY "Authenticated users can create comments"
  ON public.comments
  FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Policy: Author bisa update comment sendiri
CREATE POLICY "Users can update own comments"
  ON public.comments
  FOR UPDATE
  USING (auth.uid() = author_id);

-- Policy: Author bisa delete comment sendiri
CREATE POLICY "Users can delete own comments"
  ON public.comments
  FOR DELETE
  USING (auth.uid() = author_id);

-- 7. Enable RLS untuk discussion_likes
ALTER TABLE public.discussion_likes ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa lihat likes (untuk count)
CREATE POLICY "Likes are viewable by everyone"
  ON public.discussion_likes
  FOR SELECT
  USING (true);

-- Policy: User yang login bisa create like
CREATE POLICY "Authenticated users can create likes"
  ON public.discussion_likes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: User bisa delete like sendiri
CREATE POLICY "Users can delete own likes"
  ON public.discussion_likes
  FOR DELETE
  USING (auth.uid() = user_id);

-- 8. Enable RLS untuk discussion_views
ALTER TABLE public.discussion_views ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa lihat views (untuk count)
CREATE POLICY "Views are viewable by everyone"
  ON public.discussion_views
  FOR SELECT
  USING (true);

-- Policy: User yang login bisa create view record
CREATE POLICY "Authenticated users can create views"
  ON public.discussion_views
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 9. Create function untuk auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_discussion_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. Create triggers untuk auto-update updated_at
DROP TRIGGER IF EXISTS on_discussion_updated ON public.discussions;
CREATE TRIGGER on_discussion_updated
  BEFORE UPDATE ON public.discussions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_discussion_updated_at();

DROP TRIGGER IF EXISTS on_comment_updated ON public.comments;
CREATE TRIGGER on_comment_updated
  BEFORE UPDATE ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_discussion_updated_at();

-- 11. Create view untuk discussions dengan author profile dan vote count
CREATE INDEX IF NOT EXISTS discussions_author_id_idx ON public.discussions(author_id);
CREATE INDEX IF NOT EXISTS discussions_created_at_idx ON public.discussions(created_at DESC);
CREATE INDEX IF NOT EXISTS discussions_category_idx ON public.discussions(category);
CREATE INDEX IF NOT EXISTS comments_discussion_id_idx ON public.comments(discussion_id);
CREATE INDEX IF NOT EXISTS comments_author_id_idx ON public.comments(author_id);
CREATE INDEX IF NOT EXISTS comments_parent_id_idx ON public.comments(parent_id);
CREATE INDEX IF NOT EXISTS discussion_likes_discussion_id_idx ON public.discussion_likes(discussion_id);
CREATE INDEX IF NOT EXISTS discussion_likes_user_id_idx ON public.discussion_likes(user_id);

-- 10. Create view untuk discussions dengan author profile dan like count
CREATE OR REPLACE VIEW public.discussions_with_details AS
SELECT 
  d.*,
  p.username AS author_username,
  p.full_name AS author_full_name,
  p.avatar_url AS author_avatar,
  COUNT(DISTINCT dl.id) AS likes_count,
  COUNT(DISTINCT c.id) AS comment_count
FROM public.discussions d
LEFT JOIN public.profiles p ON d.author_id = p.id
LEFT JOIN public.discussion_likes dl ON d.id = dl.discussion_id
LEFT JOIN public.comments c ON d.id = c.discussion_id
GROUP BY d.id, p.username, p.full_name, p.avatar_url;

-- 12. Create function untuk increment views (hanya jika user belum pernah view)
CREATE OR REPLACE FUNCTION increment_discussion_views(p_discussion_id UUID, p_viewer_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Insert ke discussion_views, jika sudah ada (duplicate) maka ignore
  INSERT INTO public.discussion_views (discussion_id, user_id)
  VALUES (p_discussion_id, p_viewer_id)
  ON CONFLICT (discussion_id, user_id) DO NOTHING;
  
  -- Update views count berdasarkan jumlah unique viewers
  UPDATE public.discussions
  SET views = (
    SELECT COUNT(*) FROM public.discussion_views WHERE discussion_views.discussion_id = p_discussion_id
  )
  WHERE id = p_discussion_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- FORUM SETUP SELESAI!
-- ============================================
