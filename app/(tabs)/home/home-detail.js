import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {
  AppText,
  LoadingOverlay,
  TabNavigation,
  HeaderWithBackButton,
} from '@components/index';
import colors from '../../../constants/colors';

export default function HomeDetailScreen() {
  const [selectedTab, setSelectedTab] = useState('unfinished');
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <LoadingOverlay />
      <View style={styles.container}>
        {/* Header */}
        <HeaderWithBackButton
          title="Tổng quan"
          onBackPress={() => router.back()}
        />

        {/* Navigation Bar */}
        <TabNavigation
          tabs={[
            { id: 'unfinished', label: 'Mục học tập chưa xong' },
            { id: 'saved_exams', label: 'Đề đã lưu' },
            { id: 'exam_history', label: 'Lịch sử làm bài' },
          ]}
          selectedTab={selectedTab}
          onTabPress={setSelectedTab}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sky.lightest,
    padding: 20,
    gap: 10,
    paddingBottom: 80,
  },
  header: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: colors.ink.darkest,
  },
});
