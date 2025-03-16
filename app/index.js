// app/welcome.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
        onPress={() => router.push('/(auth)/login')}
        buttonStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "50%"
  },
});