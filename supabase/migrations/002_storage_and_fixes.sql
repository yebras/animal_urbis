-- Storage Bucket creation for Pet Photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('pet-photos', 'pet-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow public viewing of pet photos
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'pet-photos' );

-- Policy to allow authenticated uploads to pet-photos
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'pet-photos' AND auth.role() = 'authenticated' );

-- Policy to allow users to update their own images
CREATE POLICY "Users can update own images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'pet-photos' AND auth.uid() = owner )
WITH CHECK ( bucket_id = 'pet-photos' AND auth.uid() = owner );

-- Policy to allow users to delete their own images
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'pet-photos' AND auth.uid() = owner );

-- Improve Profile RLS (Ensure triggers work without issues)
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;

-- Allow users to read any profile (often needed for forum avatars, etc, not just own)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Public read access to profiles"
ON public.profiles FOR SELECT
USING (true);

-- Ensure update policy is strictly for own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- No INSERT policy needed for profiles as it's handled by trigger SECURITY DEFINER
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
