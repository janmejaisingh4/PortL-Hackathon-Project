import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra ?? {};

export const env = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || (extra.supabaseUrl as string | undefined) || '',
  supabasePublishableKey: process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY || (extra.supabasePublishableKey as string | undefined) || '',
  easProjectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID || (extra.eas?.projectId as string | undefined) || '',
};

export function validateEnv() {
  const missing = Object.entries(env)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
}
