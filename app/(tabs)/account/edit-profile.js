import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { updateUser } from '../../../features/auth/authSlice';
import colors from '../../../constants/colors';
import AppText from '../../../components/AppText';
import TextInputField from '../../../components/input-field/TextInputField';
import Button from '../../../components/button/Button';
import LoadingOverlay from '../../../components/overlay/LoadingOverlay';
import { setLoading } from '../../../features/state/stateApiSlice';
import Dropdown from '../../../components/dropdown/Dropdown';
import HeaderWithBackButton from '../../../components/header/HeaderWithBackButton'; // Import component HeaderWithBackButton
import DatePickerField from '../../../components/input-field/DatePickerField';

export default function EditProfileScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.states);

  // Individual state variables for each field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [className, setClassName] = useState('');
  const [highSchool, setHighSchool] = useState('');
  const [gender, setGender] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const hasInitRef = useRef(false);

  // State for field editability
  const [isClassEditable, setIsClassEditable] = useState(false);
  const [isHighSchoolEditable, setIsHighSchoolEditable] = useState(false);
  const [isGenderEditable, setIsGenderEditable] = useState(false);
  const [isBirthDateEditable, setIsBirthDateEditable] = useState(false);

  // Class options for dropdown
  const classOptions = [
    { code: '10', description: 'Lớp 10' },
    { code: '11', description: 'Lớp 11' },
    { code: '12', description: 'Lớp 12' },
  ];

  // Gender options for dropdown
  const genderOptions = [
    { code: false, description: 'Nữ' },
    { code: true, description: 'Nam' },
  ];

  // Initialize form data from user object
  useEffect(() => {
    if (user && !hasInitRef.current) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setClassName(user.class || '');
      setHighSchool(user.highSchool || '');
      setGender(user.gender || false);
      setBirthDate(user.birthDate ? new Date(user.birthDate) : new Date());
      hasInitRef.current = true;
    }

    if (!user) return;

    // Update fields when user changes
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    setEmail(user.email || '');
    setPhone(user.phone || '');
    setClassName(user.class || '');
    setHighSchool(user.highSchool || '');
    setGender(user.gender || false);
    setBirthDate(user.birthDate ? new Date(user.birthDate) : new Date());
  }, [user]);

  const handleSubmit = async () => {
    try {
      dispatch(setLoading(true));

      // Create updated data object similar to StudentCardModal
      const updatedData = {
        class: className,
        highSchool,
        gender,
        birthDate: birthDate.toISOString(),
      };

      await dispatch(updateUser(updatedData)).unwrap();
      router.back();
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={loading} />

      {/* Header */}
      <HeaderWithBackButton
        title="Chỉnh sửa thông tin"
        onBackPress={() => router.back()}
      />

      {/* <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color={colors.ink.dark} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Chỉnh sửa thông tin</AppText>
        <View style={styles.placeholder} />
      </View> */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Non-editable fields */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Thông tin cơ bản</AppText>
          <View style={styles.sectionBody}>
            <TextInputField
              label="Họ và tên đệm"
              value={lastName}
              onChangeText={setLastName}
              editable={false}
              inputStyle={styles.disabledInput}
            />

            <TextInputField
              label="Tên"
              value={firstName}
              onChangeText={setFirstName}
              editable={false}
              inputStyle={styles.disabledInput}
            />

            <TextInputField
              label="Số điện thoại"
              value={phone}
              onChangeText={setPhone}
              editable={false}
              keyboardType="phone-pad"
              inputStyle={styles.disabledInput}
            />

            <TextInputField
              label="Email"
              value={email ? email : 'Không có email'}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={false}
              inputStyle={styles.disabledInput}
            />
          </View>
        </View>

        {/* Editable fields */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Thông tin cá nhân</AppText>

          <View style={styles.sectionBody}>
            {/* High School - Full Width */}
            <View style={styles.inputContainer}>
              <AppText style={styles.label}>Trường</AppText>
              <View style={styles.row}>
                <TextInputField
                  value={highSchool}
                  onChangeText={setHighSchool}
                  placeholder="Nhập trường"
                  editable={isHighSchoolEditable}
                  inputStyle={[
                    !isHighSchoolEditable ? styles.disabledInput : null,
                  ]}
                  containerStyle={{ flex: 1 }}
                />
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setIsHighSchoolEditable(!isHighSchoolEditable)}
                >
                  <Feather
                    name={isHighSchoolEditable ? 'check' : 'edit-2'}
                    size={18}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Class Dropdown - Full Width */}
            <View style={styles.inputContainer}>
              <AppText style={styles.label}>Lớp</AppText>
              <View style={styles.row}>
                <Dropdown
                  options={classOptions}
                  value={className}
                  onChange={setClassName}
                  placeholder="Chọn lớp"
                  disabled={!isClassEditable}
                />
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setIsClassEditable(!isClassEditable)}
                >
                  <Feather
                    name={isClassEditable ? 'check' : 'edit-2'}
                    size={18}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Gender and Birth Date in same row */}
            <View style={styles.rowContainer}>
              {/* Gender Dropdown */}
              <View style={{ flex: 1.5 }}>
                <View style={styles.inputContainer}>
                  <AppText style={styles.label}>Giới tính</AppText>
                  <View style={styles.row}>
                    <Dropdown
                      options={genderOptions}
                      value={gender}
                      onChange={setGender}
                      placeholder="Chọn giới tính"
                      disabled={!isGenderEditable}
                    />
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => setIsGenderEditable(!isGenderEditable)}
                    >
                      <Feather
                        name={isGenderEditable ? 'check' : 'edit-2'}
                        size={18}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Birth Date Picker */}
              <View style={{ flex: 2 }}>
                <View style={styles.inputContainer}>
                  <AppText style={styles.label}>Ngày sinh</AppText>
                  <View style={styles.row}>
                    <DatePickerField
                      value={birthDate}
                      onChange={setBirthDate}
                      disabled={!isBirthDateEditable}
                      style={styles.fullWidthInput}
                    />
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() =>
                        setIsBirthDateEditable(!isBirthDateEditable)
                      }
                    >
                      <Feather
                        name={isBirthDateEditable ? 'check' : 'edit-2'}
                        size={18}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Button
          text="Lưu thay đổi"
          onPress={handleSubmit}
          style={styles.saveButton}
        />
      </ScrollView>
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
    backgroundColor: colors.sky.white,
    borderBottomColor: colors.sky.light,
    elevation: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.ink.dark,
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.ink.dark,
    marginBottom: 16,
  },
  sectionBody: {
    backgroundColor: colors.sky.white,
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.ink.darkest,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', // Căn giữa ô input và icon theo chiều dọc
    gap: 8,
  },
  disabledInput: {
    backgroundColor: colors.sky.lightest,
    borderColor: colors.sky.light,
    color: colors.ink.darker,
  },
  editButton: {
    padding: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfWidthContainer: {
    width: '48%',
  },
  saveButton: {
    marginTop: 24,
    marginBottom: 70,
  },
});
