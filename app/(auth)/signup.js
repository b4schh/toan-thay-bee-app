// app/auth/signup.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function Signup() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Giả lập đăng ký thành công
    signIn({ email });
    // Chuyển hướng sang trang chính
    router.push('/(tabs)/index');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Đăng ký</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, width: '80%', marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, width: '80%', marginBottom: 10, padding: 8 }}
      />
      <Button title="Đăng ký" onPress={handleSignup} />
    </View>
  );
}
