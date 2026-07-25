import React from 'react';
import { Text } from 'react-native-paper';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';

export default function AdminDashboardScreen() {
  return (
    <ScreenContainer>
      <AppHeader title="Admin dashboard" subtitle="Society-wide operations" />
      <Text variant="bodyMedium">Admin workflow screens will be connected to the secured database layer in later implementation phases.</Text>
    </ScreenContainer>
  );
}
