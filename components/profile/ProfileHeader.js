import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function ProfileHeader({ user, router }) {
  const avatarSource = user?.avatarUrl
    ? { uri: user.avatarUrl }
    : require('../../assets/images/default-avatar.jpg');

  const fullName = user
    ? `${user.lastName || ''} ${user.firstName || ''}`.trim()
    : 'Chưa đăng nhập';

  return (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <Image source={avatarSource} style={styles.avatar} />
        <TouchableOpacity
          style={styles.editAvatarButton}
          onPress={() => router.push('/account/edit-avatar')}
        >
          <Feather name="edit-2" size={16} color="white" />
        </TouchableOpacity>
      </View>
      <AppText style={styles.userName}>{fullName}</AppText>
      <AppText style={styles.userType}>
        {user?.userType === 'HS1' ? 'Học sinh' : 'Người dùng'}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: colors.sky.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.sky.lighter,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.sky.white,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.ink.darkest,
    marginBottom: 4,
  },
  userType: {
    fontSize: 14,
    color: colors.ink.light,
  },
});