// app/auth/login.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Button from '../../components/Button';
import TextInputField from '../../components/input-field/TextInputField';
import PasswordInputField from '../../components/input-field/PasswordInputField';
import Checkbox from '../../components/Checkbox';
import AppText from '../../components/AppText';
import colors from '../../constants/colors';

import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function Login() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    // Bắt đầu quá trình đăng nhập
    setLoading(true);

    // Giả lập quá trình đăng nhập (gọi API giả)
    setTimeout(() => {
      // Giả sử đăng nhập thành công với email đã nhập
      signIn({ username });
      setLoading(false);
      // Chuyển hướng đến trang chính của ứng dụng
      router.replace('/(tabs)');
    }, 2000); // Giả lập 2 giây chờ xử lý
  };

  return (
    <View style={styles.container}>
      {/* Khu vực header */}
      <View style={styles.headerContainer}>
        <AppText style={[styles.headerText, { fontSize: 32 }]}>
          Chào mừng!
        </AppText>
        <AppText style={[styles.headerText, { fontSize: 24 }]}>
          Đăng nhập
        </AppText>
      </View>

      {/* Khu vực nội dung (card trắng) */}
      <View style={styles.card}>
        <View style={{ marginBottom: 12 }}>
          <TextInputField
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập..."
            value={username}
            onChangeText={setUsername}
          />
          <PasswordInputField
            label="Mật khẩu"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={{}}>
          <Button
            text="Đăng nhập"
            onPress={handleLogin}
            style={{ marginTop: 16 }}
          />

          {/* Checkbox & link */}
          <View style={styles.row}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox
                label="Ghi nhớ tôi"
                checked={rememberMe}
                onToggle={() => setRememberMe(!rememberMe)}
              />
            </View>
            <TouchableOpacity>
              <AppText style={{ color: colors.ink.dark, fontSize: 14 }}>
                Cần giúp đỡ?
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, // Màu xanh ở phần trên
    paddingTop: 60, // Tạo khoảng cách xuống dưới cho header
  },
  headerContainer: {
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: 'BeVietnamPro-Bold',
    color: '#fff',
  },
  card: {
    backgroundColor: colors.sky.white,
    marginTop: 16,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '100%',
    paddingVertical: 32,
    paddingHorizontal: 20,
    // Đổ bóng nhẹ
    elevation: 2, // cho Android
  },
  row: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
});
