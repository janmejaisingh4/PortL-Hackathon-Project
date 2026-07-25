import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('resident@portl.demo');
  const [password, setPassword] = useState('Resident@123');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Login failed', error.message);
      return;
    }

    router.replace('/(resident)/home');
  }

  return (
    <ScreenContainer>
      <View style={styles.cardWrap}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.title}>Portl</Text>
            <Text variant="bodyMedium" style={styles.subtitle}>Society operations made simple</Text>
            <TextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={styles.input} />
            <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            <Button mode="contained" loading={loading} onPress={handleLogin} style={styles.button}>
              Sign in
            </Button>
            <Text variant="bodySmall" style={styles.demoText}>Demo accounts: resident@portl.demo / guard@portl.demo / admin@portl.demo</Text>
          </Card.Content>
        </Card>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  cardWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 16,
  },
  title: {
    fontWeight: '700',
    color: '#172554',
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 16,
    color: '#64748b',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
  demoText: {
    marginTop: 12,
    color: '#64748b',
  },
});
