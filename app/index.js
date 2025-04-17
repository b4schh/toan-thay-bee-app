// app/welcome.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@components/index';
import colors from '../constants/colors';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Chào mừng đến với ứng dụng!
      </Text>
      <Button
        text="Bắt đầu"
        iconColor={colors.primary}
        style={[styles.button, {}]}
        onPress={() => router.push('(auth)/login')}
        // onPress={() => router.push('(tabs)')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '50%',
  },
});
