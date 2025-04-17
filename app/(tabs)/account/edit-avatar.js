import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { updateAvatar } from '../../../features/auth/authSlice';
import colors from '../../../constants/colors';
import AppText from '../../../components/AppText';
import Button from '../../../components/button/Button';
import LoadingOverlay from '../../../components/overlay/LoadingOverlay';
import { setLoading } from '../../../features/state/stateApiSlice';

export default function EditAvatarScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.states);
  
  // State for selected image
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Default avatar if user doesn't have one
  const currentAvatarSource = user?.avatarUrl 
    ? { uri: user.avatarUrl } 
    : require('../../../assets/images/default-avatar.jpg');
  
  // Preview image (either selected new image or current avatar)
  const previewSource = selectedImage 
    ? { uri: selectedImage.uri } 
    : currentAvatarSource;

  // Request permission and pick image from gallery
  const pickImage = async () => {
    try {
      // Request media library permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Cần quyền truy cập',
          'Ứng dụng cần quyền truy cập thư viện ảnh để chọn ảnh đại diện.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage({
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại sau.');
    }
  };

  // Handle save avatar
  const handleSaveAvatar = async () => {
    if (!selectedImage) {
      Alert.alert('Thông báo', 'Vui lòng chọn ảnh đại diện mới.');
      return;
    }
    
    try {
      dispatch(setLoading(true));
      await dispatch(updateAvatar(selectedImage)).unwrap();
      router.back();
    } catch (error) {
      console.error('Failed to update avatar:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật ảnh đại diện. Vui lòng thử lại sau.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={loading} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.ink.darker} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Cập nhật ảnh đại diện</AppText>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.content}>
        {/* Avatar Preview */}
        <View style={styles.avatarContainer}>
          <Image source={previewSource} style={styles.avatar} />
          <TouchableOpacity 
            style={styles.editButton}
            onPress={pickImage}
          >
            <Feather name="camera" size={24} color={colors.sky.white} />
          </TouchableOpacity>
        </View>
        
        <AppText style={styles.instruction}>
          Nhấn vào biểu tượng máy ảnh để chọn ảnh đại diện mới từ thư viện ảnh.
        </AppText>
        
        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button 
            text="Chọn ảnh" 
            onPress={pickImage}
            style={styles.button}
            iconName="image"
            iconColor={colors.sky.white}
          />
          
          <Button 
            text="Lưu thay đổi" 
            onPress={handleSaveAvatar}
            style={[styles.button, styles.saveButton]}
            disabled={!selectedImage}
            iconName="check"
            iconColor={colors.sky.white}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sky.lightest,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.sky.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.sky.light,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.ink.dark,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  editButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.sky.white,
  },
  instruction: {
    textAlign: 'center',
    color: colors.ink.dark,
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  button: {
    flex: 1,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: colors.success,
  },
});
