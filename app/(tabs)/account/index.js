import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';
import { useRouter } from 'expo-router';

export default function AccountScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(state => state.auth);

  const handleLogout = async () => {
    try {
      // Dispatch thunk logout và chờ kết quả
      await dispatch(logout()).unwrap();
      // Sau khi đăng xuất thành công, chuyển hướng về trang login
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Đăng xuất thất bại:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tài khoản: {user ? user.username : 'Chưa đăng nhập'}</Text>
      <Button title="Đăng xuất" onPress={handleLogout} />
    </View>
  );
}
