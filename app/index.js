// app/welcome.js
import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../components/Button';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Chào mừng đến với ứng dụng!
      </Text>
      <Button
        text="Bắt đầu"
        variant="text"
        textStyle={{ fontSize: 18 }}
        onPress={() => router.push('/(auth)/login')}
      />
    </View>
  );
}
