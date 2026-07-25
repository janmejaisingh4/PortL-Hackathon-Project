import React from 'react';
import { Text } from 'react-native-paper';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';

export default function GuardDashboardScreen() {
  return (
    <ScreenContainer>
      <AppHeader title="Guard dashboard" subtitle="Visitor registration and gate operations" />
      <Text variant="bodyMedium">This screen is the guard entry point for the visitor workflow and will be expanded with real gate actions next.</Text>
    </ScreenContainer>
  );
}
