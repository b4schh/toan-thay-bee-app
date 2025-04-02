import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import AppText from '../../../components/AppText';
import Button from '../../../components/button/Button';
import ExamResultOverlay from '../../../components/overlay/ExamResultOverlay';
import colors from '../../../constants/colors';

export default function ExamResultScreen() {
  const [isResultOverlayVisible, setResultOverlayVisible] = useState(false);
  const { examResult } = useSelector((state) => state.exams);
  const { exam } = useSelector((state) => state.exams);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <AppText
          style={styles.headerText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          KẾT QUẢ
        </AppText>
        <Button
          icon="menu"
          iconLibrary="Feather"
          iconColor={colors.ink.darkest}
          style={[
            {
              width: 'auto',
              height: 'auto',
              backgroundColor: 'transparent',
              marginTop: 3,
            },
          ]}
          onPress={() => setResultOverlayVisible(true)} // Sửa lại để mở ExamResultOverlay
        />
      </View>

      <ScrollView style={styles.container}>
        <AppText style={styles.examName}>{exam?.name.toUpperCase()}</AppText>

        <View style={styles.section}></View>

        <Button
          text="Trở về trang chủ"
          onpress={() => console.log('Button Pressed!')}
        />
      </ScrollView>

      <ExamResultOverlay
        visible={isResultOverlayVisible}
        onClose={() => setResultOverlayVisible(false)}
        examResult={examResult}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Đẩy button sang phải
    paddingVertical: 20,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.sky.lighter,
  },
  headerText: {
    flex: 1,
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.ink.darkest,
    lineHeight: 30,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 0,
  },
  examName: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    color: colors.ink.darkest,
    // lineHeight: 30,
  },
});
