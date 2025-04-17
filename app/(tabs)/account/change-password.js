import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import colors from '../../../constants/colors';
import AppText from '../../../components/AppText';
import TextInputField from '../../../components/input-field/TextInputField';
import Button from '../../../components/button/Button';
import LoadingOverlay from '../../../components/overlay/LoadingOverlay';
import Dialog from '../../../components/dialog/Dialog';
import { setLoading } from '../../../features/state/stateApiSlice';
import { changePasswordAPI } from '../../../services/userApi';
import { redirectToLogin } from '../../../services/RouterService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutLocal } from '../../../features/auth/authSlice';

export default function ChangePasswordScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.states);

  // Form state
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Form validation errors
  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Dialog state
  const [dialog, setDialog] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'alert',
    onClose: () => setDialog((prev) => ({ ...prev, visible: false })),
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  useEffect(() => {
    console.log('formData', formData);
    console.log('errors', errors);
  }, [formData, errors]);

  const validateForm = () => {
    const newErrors = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    // Kiểm tra: Điền đầy đủ các trường
    if (!formData.oldPassword.trim()) {
      newErrors.oldPassword = 'Vui lòng nhập mật khẩu hiện tại';
      setErrors(newErrors);
      return 'Vui lòng nhập mật khẩu hiện tại';
    }
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
      setErrors(newErrors);
      return 'Vui lòng nhập mật khẩu mới';
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
      setErrors(newErrors);
      return 'Vui lòng xác nhận mật khẩu mới';
    }

    // Kiểm tra: Mật khẩu mới có ít nhất 6 ký tự
    if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
      setErrors(newErrors);
      return 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    // Kiểm tra: Mật khẩu xác nhận không khớp
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      setErrors(newErrors);
      return 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return null; // Không có lỗi
  };

  const handleSubmit = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      setDialog({
        visible: true,
        title: 'Lỗi',
        message: errorMessage,
        type: 'alert',
        onClose: () => setDialog((prev) => ({ ...prev, visible: false })),
      });
      return;
    }

    try {
      dispatch(setLoading(true));

      // Gọi API đổi mật khẩu
      await changePasswordAPI({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      setDialog({
        visible: true,
        title: 'Thành công',
        message:
          'Mật khẩu đã được thay đổi thành công. Vui lòng đăng nhập lại.',
        type: 'alert',
        onClose: () => {
          setDialog((prev) => ({ ...prev, visible: false }));
          AsyncStorage.removeItem('token');
          dispatch(logoutLocal());
          redirectToLogin();
        },
      });
    } catch (error) {
      let errorMessage = 'Không thể thay đổi mật khẩu. Vui lòng thử lại sau.';

      // Kiểm tra lỗi từ backend
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;

        // Gán lỗi cụ thể vào các trường
        if (errorMessage.includes('Mật khẩu cũ không đúng')) {
          setErrors((prev) => ({
            ...prev,
            oldPassword: 'Mật khẩu hiện tại không đúng',
          }));
        } else if (errorMessage.includes('Mật khẩu xác nhận không khớp')) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: 'Mật khẩu xác nhận không khớp',
          }));
        } else if (
          errorMessage.includes('Mật khẩu mới không được trùng với mật khẩu cũ')
        ) {
          setErrors((prev) => ({
            ...prev,
            newPassword: 'Mật khẩu mới không được trùng với mật khẩu cũ',
          }));
        }
      }

      // Hiển thị lỗi qua Dialog
      setDialog({
        visible: true,
        title: 'Lỗi',
        message: errorMessage,
        type: 'alert',
        onClose: () => setDialog((prev) => ({ ...prev, visible: false })),
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={loading} />

      {/* Dialog thông báo */}
      <Dialog
        visible={dialog.visible}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
        onClose={dialog.onClose}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color={colors.ink.darker} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Đổi mật khẩu</AppText>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.formContainer}>
          {/* Old Password */}
          <TextInputField
            label="Mật khẩu hiện tại"
            placeholder="Nhập mật khẩu hiện tại"
            value={formData.oldPassword}
            onChangeText={(text) => handleChange('oldPassword', text)}
            typeField="password"
            containerStyle={styles.inputField}
            labelStyle={styles.label}
            inputStyle={styles.input}
            error={errors.oldPassword}
          />

          {/* New Password */}
          <TextInputField
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            value={formData.newPassword}
            onChangeText={(text) => handleChange('newPassword', text)}
            typeField="password"
            containerStyle={styles.inputField}
            labelStyle={styles.label}
            inputStyle={styles.input}
            error={errors.newPassword}
          />

          {/* Confirm Password */}
          <TextInputField
            label="Xác nhận mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            typeField="password"
            containerStyle={styles.inputField}
            labelStyle={styles.label}
            inputStyle={styles.input}
            error={errors.confirmPassword}
          />

          <Button
            text="Đổi mật khẩu"
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
        <View style={styles.notes}>
          <View style={styles.note}>
            <Feather name="alert-circle" size={18} color="black" />
            <AppText>Mật khẩu phải có ít nhất 6 ký tự.</AppText>
          </View>
          <View style={styles.note}>
            <Feather name="alert-circle" size={18} color="black" />
            <AppText>Mật khẩu mới không được giống mật khẩu cũ.</AppText>
          </View>
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
    color: colors.ink.darker,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formContainer: {
    backgroundColor: colors.sky.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputField: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: colors.ink.darkest,
  },
  input: {
    fontSize: 14,
    color: colors.ink.darker,
  },
  submitButton: {
    marginTop: 16,
  },
  notes: {
    backgroundColor: colors.sky.base + '80',
    borderRadius: 8,
    padding: 16,
    gap: 8
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  }
});
