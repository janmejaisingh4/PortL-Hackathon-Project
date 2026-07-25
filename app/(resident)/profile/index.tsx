import React from 'react';
import { Button, Text } from 'react-native-paper';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'expo-router';

export default function ResidentProfileScreen() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace('/(auth)/login');
  }

  return (
    <ScreenContainer>
      <AppHeader title="Profile" subtitle="Manage your account" />
      <Text variant="bodyMedium">Resident profile and settings will be completed as the app grows.</Text>
      <Button mode="outlined" onPress={handleLogout} style={{ marginTop: 16 }}>
        Sign out
      </Button>
    </ScreenContainer>
  );
}
