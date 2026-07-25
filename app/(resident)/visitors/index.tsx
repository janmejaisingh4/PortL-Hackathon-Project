import React from 'react';
import { Text } from 'react-native-paper';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';

export default function ResidentVisitorsScreen() {
  return (
    <ScreenContainer>
      <AppHeader title="Visitor history" subtitle="Approved, pending, and past visits" />
      <Text variant="bodyMedium">Visitor history will be connected to Supabase in the next development stages.</Text>
    </ScreenContainer>
  );
}
