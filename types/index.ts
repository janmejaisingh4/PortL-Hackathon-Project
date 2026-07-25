export type AppRole = 'resident' | 'guard' | 'admin';

export interface Profile {
  id: string;
  society_id: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: AppRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
