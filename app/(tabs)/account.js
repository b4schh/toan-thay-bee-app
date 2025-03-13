import { View, Text, Button } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function AccountScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tài khoản</Text>
      <Button
        title="Đăng xuất"
        onPress={() => {
          signOut();
          router.push('/(auth)/login');
        }}
      />
    </View>
  );
}
