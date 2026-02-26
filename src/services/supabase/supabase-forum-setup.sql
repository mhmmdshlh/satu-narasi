-- ============================================
-- Discussion Form
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
-- Survey Form
-- ============================================

CREATE TABLE IF NOT EXISTS public.jabar_issues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  issue_name TEXT NOT NULL,
  issue_description TEXT NOT NULL,
  total_votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.issue_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  issue_id UUID REFERENCES public.jabar_issues(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(issue_id, user_id) -- User hanya bisa vote 1x per issue
);

-- Enable RLS untuk jabar_issues
ALTER TABLE public.jabar_issues ENABLE ROW LEVEL SECURITY;



-- Policy: Semua orang bisa lihat jabar_issues
CREATE POLICY "Jabar issues are viewable by everyone"
  ON public.jabar_issues
  FOR SELECT
  USING (true);

-- Policy: User yang login bisa vote issue
CREATE POLICY "Authenticated users can vote on issues"
  ON public.issue_votes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at on issue_votes
CREATE OR REPLACE FUNCTION public.handle_issue_vote_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on issue_votes
DROP TRIGGER IF EXISTS on_issue_vote_updated ON public.issue_votes;
CREATE TRIGGER on_issue_vote_updated
  BEFORE UPDATE ON public.issue_votes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_issue_vote_updated_at();

-- Function to handle vote count on jabar_issues
CREATE OR REPLACE FUNCTION handle_count_issue_votes(
  p_issue_id UUID,
  p_voter_id UUID
)
RETURNS VOID AS $$
DECLARE
  v_old_issue UUID;
BEGIN
  -- ambil vote lama
  SELECT issue_id INTO v_old_issue
  FROM public.issue_votes
  WHERE user_id = p_voter_id;

  -- CASE 1: belum pernah vote
  IF v_old_issue IS NULL THEN
    
    INSERT INTO public.issue_votes (user_id, issue_id)
    VALUES (p_voter_id, p_issue_id);

    UPDATE public.jabar_issues
    SET total_votes = total_votes + 1
    WHERE id = p_issue_id;

  -- CASE 2: klik issue yang sama → UNVOTE
  ELSIF v_old_issue = p_issue_id THEN

    DELETE FROM public.issue_votes
    WHERE user_id = p_voter_id;

    UPDATE public.jabar_issues
    SET total_votes = total_votes - 1
    WHERE id = p_issue_id;

  -- CASE 3: pindah vote
  ELSE

    UPDATE public.jabar_issues
    SET total_votes = total_votes - 1
    WHERE id = v_old_issue;

    UPDATE public.issue_votes
    SET issue_id = p_issue_id
    WHERE user_id = p_voter_id;

    UPDATE public.jabar_issues
    SET total_votes = total_votes + 1
    WHERE id = p_issue_id;

  END IF;

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
