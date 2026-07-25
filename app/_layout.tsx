import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { queryClient } from '../lib/query-client';
import { validateEnv } from '../lib/env';
import { useThemeStore } from '../stores/theme-store';

const baseLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#172554',
    secondary: '#3b82f6',
    background: '#f5f7fb',
    surface: '#ffffff',
    surfaceVariant: '#eef2ff',
    outline: '#cbd5e1',
  },
};

const baseDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#93c5fd',
    secondary: '#60a5fa',
    background: '#020617',
    surface: '#0f172a',
    surfaceVariant: '#172554',
    outline: '#334155',
  },
};

export default function RootLayout() {
  const mode = useThemeStore((state) => state.mode);

  useEffect(() => {
    try {
      validateEnv();
    } catch (error) {
      console.warn(error);
    }
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={mode === 'dark' ? baseDarkTheme : baseLightTheme}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
          <Stack screenOptions={{ headerShown: false }} />
        </QueryClientProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
