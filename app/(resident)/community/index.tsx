import React from 'react';
import { Text } from 'react-native-paper';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';

export default function ResidentCommunityScreen() {
  return (
    <ScreenContainer>
      <AppHeader title="Community" subtitle="Notices, polls, staff, and services" />
      <Text variant="bodyMedium">Community modules will be wired to Supabase in a later phase.</Text>
    </ScreenContainer>
  );
}
