import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { getProfile } from '../services/auth/auth-service';

export function useAuthSession() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/(auth)/login');
        setReady(true);
        return;
      }

      try {
        const profile = await getProfile();
        if (profile) {
          const target = profile.role === 'guard' ? '/(guard)/dashboard' : profile.role === 'admin' ? '/(admin)/dashboard' : '/(resident)/home';
          router.replace(target as never);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        setReady(true);
      }
    }

    void loadSession();
  }, [router]);

  return { ready };
}
