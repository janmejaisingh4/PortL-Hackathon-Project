import 'dotenv/config';

export default {
  expo: {
    name: 'Portl',
    slug: 'Portl',
    scheme: 'portl',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    platforms: ['android'],
    android: {
      package: 'com.portl.society',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#172554',
      },
      permissions: ['CAMERA', 'READ_EXTERNAL_STORAGE', 'WRITE_EXTERNAL_STORAGE', 'POST_NOTIFICATIONS'],
    },
    extra: {
      eas: {
        projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID || 'placeholder-project-id',
      },
    },
    plugins: ['expo-router', 'expo-secure-store', 'expo-notifications'],
  },
};
