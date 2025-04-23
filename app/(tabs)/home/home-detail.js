import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  AppText,
  LoadingOverlay,
  TabNavigation,
  HeaderWithBackButton,
  UnfinishedLearningItem,
  CompletedTestItem,
  SavedExamItem,
} from '@components/index';

import {
  getUncompletedLearningItem,
} from '../../../features/class/classSlice';
import {
  fetchAttemptCompleted,
} from '../../../features/attempt/attemptSlice';
import {
  fetchSavedExams,
} from '../../../features/exam/examSlice';

import colors from '../../../constants/colors';

export default function HomeDetailScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState('unfinished');
  const [refreshing, setRefreshing] = useState(false);

  const { learningItems } = useSelector((state) => state.classes);
  const { completedAttempts } = useSelector((state) => state.attempts);
  const { examsSaved } = useSelector((state) => state.exams);

  useEffect(() => {
    dispatch(getUncompletedLearningItem());
    dispatch(fetchAttemptCompleted());
    dispatch(fetchSavedExams());
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getUncompletedLearningItem());
    dispatch(fetchAttemptCompleted());
    dispatch(fetchSavedExams());
    setRefreshing(false);
  }, []);

  const renderLearningItem = ({ item }) => (
    <UnfinishedLearningItem item={item} />
  );

  const renderCompletedTest = ({ item }) => (
    <CompletedTestItem attempt={item} />
  );

  const renderSavedExam = ({ item }) => {
    const examData = item.exam ? { ...item.exam, isDone: item.isDone } : item;
    return <SavedExamItem exam={examData} />;
  };

  const TabContent = useMemo(() => {
    if (selectedTab === 'unfinished') {
      return learningItems && learningItems.length > 0 ? (
        <FlatList
          data={learningItems}
          renderItem={renderLearningItem}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
        />
      ) : (
        <AppText style={styles.emptyText}>
          Không có mục học tập nào chưa hoàn thành
        </AppText>
      );
    }

    if (selectedTab === 'saved_exams') {
      return examsSaved && examsSaved.length > 0 ? (
        <FlatList
          data={examsSaved}
          renderItem={renderSavedExam}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
        />
      ) : (
        <AppText style={styles.emptyText}>Bạn chưa lưu đề thi nào</AppText>
      );
    }

    if (selectedTab === 'exam_history') {
      return completedAttempts && completedAttempts.length > 0 ? (
        <FlatList
          data={completedAttempts}
          renderItem={renderCompletedTest}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
        />
      ) : (
        <AppText style={styles.emptyText}>Chưa có bài kiểm tra nào</AppText>
      );
    }

    return null;
  }, [selectedTab, learningItems, examsSaved, completedAttempts, refreshing]);

  return (
    <View style={styles.container}>
      <HeaderWithBackButton title="Tổng quan" onBackPress={() => router.back()} />
      <View style={styles.content}>
        <TabNavigation
          tabs={[
            { id: 'unfinished', label: 'Mục học tập chưa xong' },
            { id: 'saved_exams', label: 'Đề đã lưu' },
            { id: 'exam_history', label: 'Lịch sử làm bài' },
          ]}
          selectedTab={selectedTab}
          onTabPress={setSelectedTab}
        />
        <View style={{ flex: 1 }}>{TabContent}</View>
      </View>
      <LoadingOverlay />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sky.lightest,
  },
  content: {
    flex: 1,
    backgroundColor: colors.sky.lightest,
    paddingHorizontal: 20,
    marginBottom: 80,
    gap: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.ink.dark,
  },
});
