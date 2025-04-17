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
    <View style={styles.container}>
      <LoadingOverlay />

      {/* Header */}
      <HeaderWithBackButton
        title="Tổng quan"
        onBackPress={() => router.back()}
      />

      <View style={styles.content}>
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
    gap: 16,
    backgroundColor: colors.sky.lightest,
  },
  content: {
    flex: 1,
    backgroundColor: colors.sky.lightest,
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 80,
  },
});
