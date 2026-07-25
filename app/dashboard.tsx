import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Chip, SegmentedButtons, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { AppHeader } from '../components/common/AppHeader';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { StatusBadge } from '../components/common/StatusBadge';
import { useThemeStore } from '../stores/theme-store';

const roles = [
  { value: 'resident', label: 'Resident' },
  { value: 'guard', label: 'Guard' },
  { value: 'admin', label: 'Admin' },
] as const;

type RoleValue = (typeof roles)[number]['value'];

const roleContent: Record<RoleValue, { title: string; subtitle: string; highlights: string[] }> = {
  resident: {
    title: 'Resident dashboard',
    subtitle: 'Approve visitor requests, track community updates, and stay on top of your society.',
    highlights: ['Pending approvals', 'Visitor history', 'Complaints', 'Notices'],
  },
  guard: {
    title: 'Guard dashboard',
    subtitle: 'Register visitors, verify pre-approvals, and mark entry and exit in real time.',
    highlights: ['Register visitor', 'Verify pass', 'Entry log', 'Exit log'],
  },
  admin: {
    title: 'Admin dashboard',
    subtitle: 'Coordinate residents, gates, complaints, amenities, and maintenance from one view.',
    highlights: ['Society operations', 'People', 'Amenities', 'Maintenance'],
  },
};

export default function DashboardScreen() {
  const router = useRouter();
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const [selectedRole, setSelectedRole] = React.useState<RoleValue>('resident');

  const content = roleContent[selectedRole];

  return (
    <ScreenContainer contentStyle={styles.content}>
      <View style={styles.topRow}>
        <AppHeader title="Portl" subtitle="Role-based society operations" />
        <Button mode="outlined" onPress={toggleMode} compact>
          {mode === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </Button>
      </View>

      <SegmentedButtons
        value={selectedRole}
        onValueChange={(value) => setSelectedRole(value as RoleValue)}
        buttons={roles.map((role) => ({ value: role.value, label: role.label }))}
        style={styles.segmented}
      />

      <Card style={styles.card}>
        <Card.Content>
          <StatusBadge label={selectedRole.toUpperCase()} tone="info" />
          <Text variant="titleMedium" style={styles.title}>
            {content.title}
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            {content.subtitle}
          </Text>
          <View style={styles.chipsRow}>
            {content.highlights.map((item) => (
              <Chip key={item} style={styles.chip} compact>
                {item}
              </Chip>
            ))}
          </View>
          <Button mode="contained" style={styles.button} onPress={() => router.push('/(auth)/login')}>
            Open {selectedRole} view
          </Button>
        </Card.Content>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  segmented: {
    marginBottom: 14,
  },
  card: {
    borderRadius: 16,
    paddingVertical: 4,
  },
  title: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: '700',
    color: '#172554',
  },
  description: {
    color: '#64748b',
    lineHeight: 22,
    marginBottom: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  chip: {
    marginRight: 8,
  },
  button: {
    alignSelf: 'flex-start',
  },
});
