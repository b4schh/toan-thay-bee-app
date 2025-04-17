import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';
import { useRouter } from 'expo-router';
import colors from '../../../constants/colors';
import { Button, ProfileHeader, Section, MenuItem } from '@components/index';

export default function AccountScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Đăng xuất thất bại:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader user={user} router={router} />
      
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}

        {/* Personal Information Section */}
        <Section title="Thông tin cá nhân">
          <MenuItem
            icon="user"
            text="Chỉnh sửa thông tin"
            onPress={() => router.push('/account/edit-profile')}
          />
          <MenuItem
            icon="lock"
            text="Đổi mật khẩu"
            onPress={() => router.push('/account/change-password')}
          />
        </Section>

        {/* Settings Section */}
        <Section title="Cài đặt">
          <MenuItem
            icon="bell"
            text="Thông báo"
            onPress={() => console.log('Navigate to Notifications')}
          />
          <MenuItem
            icon="help-circle"
            text="Trợ giúp & Hỗ trợ"
            onPress={() => console.log('Navigate to Help & Support')}
          />
        </Section>

        {/* Legal Section */}
        <Section title="Pháp lý">
          <MenuItem
            icon="file-text"
            text="Điều khoản sử dụng"
            onPress={() => router.push('/account/terms-of-service')}
          />
          <MenuItem
            icon="shield"
            text="Chính sách riêng tư"
            onPress={() => router.push('/account/privacy-policy')}
          />
        </Section>

        {/* Logout Button */}

        <Button
          text="Đăng xuất"
          icon="log-out"
          iconLibrary="Feather"
          iconSize={20}
          iconColor={colors.danger}
          onPress={handleLogout}
          style={styles.logoutButton}
          textStyle={styles.logoutText}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sky.lightest,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.sky.white,
    marginTop: 24,
    marginBottom: 120,
    paddingVertical: 32,
    borderRadius: 8,
    shadowColor: colors.ink.darkest,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutText: {
    fontFamily: 'Inter-Bold',
    color: colors.danger,
    marginLeft: 8,
  },
});
