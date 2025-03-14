// app/auth/login.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
} from 'react-native';
import { Formik } from 'formik';
import Button from '../../components/Button';
import * as Yup from 'yup';
import TextInputField from '../../components/input-field/TextInputField';
import Checkbox from '../../components/Checkbox';
import AppText from '../../components/AppText';
import colors from '../../constants/colors';

import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function Login() {
  const { signIn } = useAuth();
  const router = useRouter();
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Tên đăng nhập không được để trống'),
    password: Yup.string().required('Mật khẩu không được để trống'),
  });

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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  console.log('Trang login');

  return (
    <View style={styles.container}>
      {/* Khu vực header */}
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

      {/* Khu vực nội dung (card trắng) */}
      <View style={styles.card}>
        <Formik
          initialValues={{ username: '', password: '', rememberMe: false }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log(values);
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
          }) => (
            <View style={styles.form}>
              {/* Tên đăng nhập */}
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
                    // Nếu có lỗi và người dùng nhập giá trị mới, xóa lỗi
                    if (errors.username) {
                      setFieldError('username', '');
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
                  // Truyền style lỗi nếu có lỗi
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

                {/* Mật khẩu */}
                <TextInputField
                  label="Mật khẩu"
                  typeField="password"
                  onChangeText={(text) => {
                    handleChange('password')(text);
                    // Nếu có lỗi và người dùng nhập giá trị mới, xóa lỗi
                    if (errors.password) {
                      setFieldError('password', '');
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
                  // Truyền style lỗi nếu có lỗi
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

              {/* Nút đăng nhập */}
              <Button text="Đăng nhập" onPress={handleSubmit} />

              {/* Ghi nhớ đăng nhập & Cần giúp đỡ? */}
              <View style={styles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Checkbox
                    label="Ghi nhớ tôi"
                    checked={values.rememberMe} // Lấy từ Formik
                    onToggle={() =>
                      setFieldValue('rememberMe', !values.rememberMe)
                    } // Cập nhật Formik
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, // Màu xanh ở phần trên
    paddingTop: 40, // Tạo khoảng cách xuống dưới cho header
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
    // Đổ bóng nhẹ
    elevation: 2, // cho Android
  },
  form: {
    gap: 16,
  },
  inputField: {},
  errorSpacing: {
    marginBottom: 0, // tăng khoảng cách khi có lỗi để tránh dính
  },
  errorLabel: {
    color: colors.danger, // Đổi màu label khi  có lỗi
  },
  errorInputBorder: {
    borderColor: colors.danger, // Đổi màu viền input khi có lỗi
  },
  error: {
    color: colors.danger,
    marginTop: -12, // khoảng cách giữa input và error text
    marginBottom: 8, // khoảng cách sau error text
  },
  row: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
