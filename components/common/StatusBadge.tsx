import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface StatusBadgeProps {
  label: string;
  tone?: 'success' | 'warning' | 'danger' | 'info';
}

export function StatusBadge({ label, tone = 'info' }: StatusBadgeProps) {
  const colorMap = {
    success: { background: '#dcfce7', text: '#166534' },
    warning: { background: '#fef3c7', text: '#92400e' },
    danger: { background: '#fee2e2', text: '#b91c1c' },
    info: { background: '#dbeafe', text: '#1d4ed8' },
  };

  const colors = colorMap[tone];

  return (
    <View style={[styles.badge, { backgroundColor: colors.background }]}> 
      <Text style={[styles.text, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});
