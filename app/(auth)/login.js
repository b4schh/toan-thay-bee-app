// app/auth/login.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Button';
import TextInputField from '../../components/input-field/TextInputField';
import Checkbox from '../../components/Checkbox';
import AppText from '../../components/AppText';
import CustomAlert from '../../components/CustomAlert';
import colors from '../../constants/colors';

// Import action login được tạo từ authSlice (sử dụng createAsyncThunk)
import { login } from '../../features/auth/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Lấy trạng thái auth từ Redux
  const { user, loading } = useSelector((state) => state.auth);

  // State cho custom alert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // Schema validation cho form login
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Tên đăng nhập không được để trống'),
    password: Yup.string().required('Mật khẩu không được để trống'),
  });

  // Nếu đã đăng nhập thành công (user !== null), chuyển hướng đến trang chính
  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user, router]);

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />

      {/* Header */}
      <View style={styles.headerContainer}>
        <AppText
          style={[styles.headerText, { fontSize: 32, marginBottom: 12 }]}
        >
          Chào mừng!
        </AppText>
        <AppText style={[styles.headerText, { fontSize: 24 }]}>
          Đăng nhập
        </AppText>
      </View>

      {/* Card chứa form */}
      <View style={styles.card}>
        <Formik
          initialValues={{ username: '', password: '', rememberMe: false }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              // Tạo payload mới không chứa trường rememberMe
              const payload = {
                username: values.username,
                password: values.password,
              };
              await dispatch(login(payload)).unwrap();
              // Nếu đăng nhập thành công, việc chuyển hướng được thực hiện bởi useEffect dựa trên state auth.user
            } catch (error) {
              // Phân biệt lỗi xác thực và lỗi kết nối
              let message = "";
              if (
                error &&
                (error === 401 ||
                  error === 403 ||
                  error === 404)
              ) {
                message = "Tài khoản hoặc mật khẩu không đúng!";
              } else {
                message = "Kết nối không ổn định";
              }
              setAlertTitle("Đăng nhập thất bại");
              setAlertMessage(message);
              setAlertVisible(true);
              console.error('Đăng nhập thất bại, Status =', error);
            } finally {
              setSubmitting(false);
            }
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            setFieldError,
            isSubmitting,
          }) => (
            <View style={styles.form}>
              <View
                style={[
                  styles.inputField,
                  errors.username && touched.username && styles.errorSpacing,
                ]}
              >
                <TextInputField
                  label="Tên đăng nhập"
                  onChangeText={(text) => {
                    handleChange('username')(text);
                    if (errors.username) {
                      setFieldError('username', undefined);
                    }
                  }}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  placeholder="Nhập tên đăng nhập..."
                  placeholderTextColor={
                    errors.username && touched.username
                      ? colors.danger
                      : colors.ink.light
                  }
                  labelStyle={
                    errors.username && touched.username ? styles.errorLabel : {}
                  }
                  inputStyle={
                    errors.username && touched.username
                      ? styles.errorInputBorder
                      : {}
                  }
                />
                {errors.username && touched.username && (
                  <Text style={styles.error}>{errors.username}</Text>
                )}

                <TextInputField
                  label="Mật khẩu"
                  typeField="password"
                  onChangeText={(text) => {
                    handleChange('password')(text);
                    if (errors.password) {
                      setFieldError('password', undefined);
                    }
                  }}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Nhập mật khẩu..."
                  placeholderTextColor={
                    errors.password && touched.password
                      ? colors.danger
                      : colors.ink.light
                  }
                  labelStyle={
                    errors.password && touched.password ? styles.errorLabel : {}
                  }
                  inputStyle={
                    errors.password && touched.password
                      ? styles.errorInputBorder
                      : {}
                  }
                />
                {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>

              <Button
                text="Đăng nhập"
                onPress={handleSubmit}
                disabled={isSubmitting || loading}
              />

              <View style={styles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Checkbox
                    label="Ghi nhớ tôi"
                    checked={values.rememberMe}
                    onToggle={() =>
                      setFieldValue('rememberMe', !values.rememberMe)
                    }
                  />
                </View>
                <TouchableOpacity>
                  <AppText style={{ color: colors.ink.dark, fontSize: 14 }}>
                    Quên mật khẩu?
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 40,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontFamily: 'BeVietnamPro-Bold',
    color: colors.sky.white,
  },
  card: {
    backgroundColor: colors.sky.white,
    marginTop: 16,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '100%',
    paddingVertical: 32,
    paddingHorizontal: 20,
    elevation: 2,
  },
  form: {
    gap: 16,
  },
  inputField: {},
  errorSpacing: {
    marginBottom: 0,
  },
  errorLabel: {
    color: colors.danger,
  },
  errorInputBorder: {
    borderColor: colors.danger,
  },
  error: {
    color: colors.danger,
    marginTop: -12,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});
