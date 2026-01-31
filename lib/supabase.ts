import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type for a professional in the directory
export type Professional = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  location: string;
  bio: string | null;
  expertise: string;
  specialties: string[] | null;
  years_experience: number | null;
  website: string | null;
  verified: boolean;
  public: boolean;
  email_verified: boolean;
  verification_token: string | null;
};
