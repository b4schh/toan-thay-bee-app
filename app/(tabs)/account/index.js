import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';
import { useRouter } from 'expo-router';
import colors from '../../../constants/colors';
import {
  Button,
  ProfileHeader,
  Section,
  MenuItem,
  AppText,
} from '@components/index';
import { Feather } from '@expo/vector-icons';

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
  
  const codes = {
    chapter: [
      { code: '10C1', description: 'MỆNH ĐỀ VÀ TẬP HỢP' },
      { code: '10C11', description: 'Mệnh đề' },
      { code: '10C12', description: 'Tập hợp và các phép toán trên tập hợp' },
      { code: '11C1', description: '123' },
      { code: '11C11', description: '456' },
      { code: '11C12', description: '789' },
    ],
  };

  const gradeFilters = 11;
  const filtered = codes['chapter'].filter((chapter) =>
    chapter.code.startsWith(gradeFilters),
  );

  console.log('Chapter filtered:', filtered);

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
        {/* <Button
          text="Đăng xuất"
          icon="log-out"
          iconLibrary="Feather"
          iconSize={20}
          iconColor={colors.danger}
          onPress={handleLogout}
          style={styles.logoutButton}
          textStyle={styles.logoutText}
        /> */}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={24} color={colors.danger} />
          <AppText style={styles.logoutText}>Đăng xuất</AppText>
        </TouchableOpacity>
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
    paddingVertical: 20,
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
