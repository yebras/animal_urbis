-- MascotaZEN Database Schema
-- Run this migration in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    display_name TEXT,
    avatar_url TEXT,
    province TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Pets table
CREATE TABLE IF NOT EXISTS public.pets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    type TEXT CHECK (type IN ('dog', 'cat')) NOT NULL,
    breed TEXT,
    birth_date DATE,
    favorite_toy TEXT,
    photo_url TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- News articles table
CREATE TABLE IF NOT EXISTS public.news_articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT,
    source_name TEXT,
    source_url TEXT NOT NULL,
    ai_image_url TEXT,
    category TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Forum posts table
CREATE TABLE IF NOT EXISTS public.forum_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    is_moderated BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Forum replies table
CREATE TABLE IF NOT EXISTS public.forum_replies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    is_moderated BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Spanish provinces table
CREATE TABLE IF NOT EXISTS public.provinces (
    id SERIAL PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    community TEXT NOT NULL
);

-- Legal resources table
CREATE TABLE IF NOT EXISTS public.legal_resources (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    province_code TEXT REFERENCES public.provinces(code),
    title TEXT NOT NULL,
    description TEXT,
    url TEXT,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Chat history table
CREATE TABLE IF NOT EXISTS public.chat_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Interest links / Places table
CREATE TABLE IF NOT EXISTS public.interest_links (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    google_place_id TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    address TEXT,
    province_code TEXT REFERENCES public.provinces(code),
    rating DECIMAL(2, 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Row Level Security Policies

-- Profiles: Users can only see their own profile
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Pets: Users can only manage their own pets
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pets" ON public.pets
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pets" ON public.pets
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pets" ON public.pets
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own pets" ON public.pets
    FOR DELETE USING (auth.uid() = user_id);

-- News: Public read access
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view news" ON public.news_articles
    FOR SELECT USING (true);

-- Forum posts: Public read, authenticated write
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view moderated posts" ON public.forum_posts
    FOR SELECT USING (is_moderated = true OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can create posts" ON public.forum_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON public.forum_posts
    FOR UPDATE USING (auth.uid() = user_id);

-- Forum replies: Similar to posts
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view moderated replies" ON public.forum_replies
    FOR SELECT USING (is_moderated = true OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can create replies" ON public.forum_replies
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Provinces and legal resources: Public read
ALTER TABLE public.provinces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view provinces" ON public.provinces FOR SELECT USING (true);

ALTER TABLE public.legal_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view legal resources" ON public.legal_resources FOR SELECT USING (true);

-- Interest links: Public read
ALTER TABLE public.interest_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view interest links" ON public.interest_links FOR SELECT USING (true);

-- Functions

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to increment post views
CREATE OR REPLACE FUNCTION public.increment_post_views(post_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.forum_posts SET views = views + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
