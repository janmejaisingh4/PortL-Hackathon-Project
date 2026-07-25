import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { StatusBadge } from '../../components/common/StatusBadge';

export default function ResidentHomeScreen() {
  return (
    <ScreenContainer>
      <AppHeader title="Good morning" subtitle="GreenView Residency · A-502" />
      <Card style={styles.card}>
        <Card.Content>
          <StatusBadge label="2 pending approvals" tone="warning" />
          <Text variant="titleMedium" style={styles.title}>Visitors awaiting your response</Text>
          <Text variant="bodyMedium" style={styles.body}>Resident approval is the core Portl workflow. Approve or reject visitors from here.</Text>
          <Button mode="contained" style={styles.button}>Review requests</Button>
        </Card.Content>
      </Card>
      <View style={styles.grid}>
        <Card style={styles.miniCard}>
          <Card.Content>
            <Text variant="labelLarge">Quick actions</Text>
            <Text variant="bodyMedium">Pre-approve guest</Text>
          </Card.Content>
        </Card>
        <Card style={styles.miniCard}>
          <Card.Content>
            <Text variant="labelLarge">Open complaints</Text>
            <Text variant="bodyMedium">1 active</Text>
          </Card.Content>
        </Card>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 16, borderRadius: 16 },
  title: { marginTop: 8, marginBottom: 4, fontWeight: '700' },
  body: { color: '#64748b', marginBottom: 12 },
  button: { alignSelf: 'flex-start' },
  grid: { flexDirection: 'row', gap: 12 },
  miniCard: { flex: 1, borderRadius: 16 },
});
