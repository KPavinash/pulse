-- Enable PostGIS extension for geospatial queries
CREATE EXTENSION IF NOT EXISTS "postgis" WITH SCHEMA extensions;

-- Setup initial profile tables
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE CHECK (char_length(username) >= 3),
    avatar_url TEXT,
    bio TEXT CHECK (char_length(bio) <= 500),
    last_active TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Turn on RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- 2. User Status (Ephemeral)
CREATE TABLE public.user_status (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    status_text TEXT NOT NULL CHECK (char_length(status_text) <= 50),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.user_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view active statuses"
ON public.user_status FOR SELECT
USING (expires_at > now());

CREATE POLICY "Users can manage their own status"
ON public.user_status FOR ALL
USING (auth.uid() = user_id);

-- 3. Messages & Conversations
CREATE TABLE public.conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.conversation_participants (
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    PRIMARY KEY (conversation_id, user_id)
);

ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL CHECK (char_length(content) > 0),
    image_url TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Chat Policies
CREATE POLICY "Users can view conversations they are participating in"
ON public.conversation_participants FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can view messages in their conversations"
ON public.messages FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.conversation_participants cp
        WHERE cp.conversation_id = messages.conversation_id
        AND cp.user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert messages in their conversations"
ON public.messages FOR INSERT
WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
        SELECT 1 FROM public.conversation_participants cp
        WHERE cp.conversation_id = messages.conversation_id
        AND cp.user_id = auth.uid()
    )
);

-- 4. User Locations (Private, visible only via RPC)
-- We store exact location here but NEVER expose it directly to other users.
CREATE TABLE public.user_locations (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    location geography(POINT) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.user_locations ENABLE ROW LEVEL SECURITY;

CREATE INDEX user_locations_geo_index ON public.user_locations USING GIST (location);

-- RLS: Only owner can see/edit their raw location
CREATE POLICY "Users can view their own location"
ON public.user_locations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own location"
ON public.user_locations FOR ALL
USING (auth.uid() = user_id);

-- 5. RPC Function for "Pulse Grid"
-- Returns distance only, fuzzing the exact location
CREATE OR REPLACE FUNCTION public.get_nearby_users(
    lat FLOAT,
    long FLOAT,
    radius_meters INT DEFAULT 5000,
    limit_count INT DEFAULT 50
)
RETURNS TABLE (
    id UUID,
    username TEXT,
    avatar_url TEXT,
    bio TEXT,
    status_text TEXT,
    dist_meters FLOAT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.username,
        p.avatar_url,
        p.bio,
        s.status_text,
        ST_Distance(l.location, ST_SetSRID(ST_MakePoint(long, lat), 4326)::geography) AS dist_meters
    FROM
        public.profiles p
    JOIN
        public.user_locations l ON p.id = l.user_id
    LEFT JOIN
        public.user_status s ON p.id = s.user_id AND s.expires_at > now()
    WHERE
        ST_DWithin(l.location, ST_SetSRID(ST_MakePoint(long, lat), 4326)::geography, radius_meters)
        AND p.id != auth.uid()
    ORDER BY
        dist_meters ASC
    LIMIT
        limit_count;
END;
$$;
