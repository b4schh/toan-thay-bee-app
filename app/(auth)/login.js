// app/auth/login.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function Login() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    // Bắt đầu quá trình đăng nhập
    setLoading(true);

    // Giả lập quá trình đăng nhập (gọi API giả)
    setTimeout(() => {
      // Giả sử đăng nhập thành công với email đã nhập
      signIn({ email });
      setLoading(false);
      // Chuyển hướng đến trang chính của ứng dụng
      router.replace('/(tabs)');
    }, 2000); // Giả lập 2 giây chờ xử lý
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Đăng nhập</Text>
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
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Đăng nhập" onPress={handleLogin} />
      )}
    </View>
  );
}
