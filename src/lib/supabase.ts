import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Ensure we don't crash if keys are missing during build/dev without env
const isValidSetup = supabaseUrl && supabaseAnonKey

export const supabase = isValidSetup
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

if (!isValidSetup && typeof window !== 'undefined') {
    console.warn('Supabase keys are missing. Realtime features will not work.')
}
