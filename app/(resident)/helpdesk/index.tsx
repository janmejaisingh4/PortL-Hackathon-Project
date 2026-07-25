import React from 'react';
import { Text } from 'react-native-paper';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';

export default function ResidentHelpdeskScreen() {
  return (
    <ScreenContainer>
      <AppHeader title="Helpdesk" subtitle="Raise complaints and track progress" />
      <Text variant="bodyMedium">Complaint workflows will be connected to the backend in the next phases.</Text>
    </ScreenContainer>
  );
}
