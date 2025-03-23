import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import ExamCard from '../../../components/card/ExamCard';
import SearchBar from '../../../components/SearchBar';
import AppText from '../../../components/AppText';
import Button from '../../../components/Button';
import TabNavigation from '../../../components/TabNavigation';
import CustomModal from '../../../components/CustomModal';
import colors from '../../../constants/colors';
import { fetchExamsByUser } from '../../../features/exam/examSlice';
import { useDispatch, useSelector } from 'react-redux';

const useFilteredExam = (exams, grade) => {
  return useMemo(() => {
    if (grade === 'all') return exams;
    return exams.filter((exam) => exam.class === grade.replace('grade_', ''));
  }, [exams, grade]);
};

export default function PracticeScreen() {
  const [selectedGrade, setSelectedGrade] = useState('all');

  const { exams } = useSelector((state) => state.exam);
  const { search, currentPage, limit, totalItems, sortOrder } = useSelector(
    (state) => state.filter,
  );
  const dispatch = useDispatch();

  const filteredExam = useFilteredExam(exams, selectedGrade);

  useEffect(() => {
    dispatch(fetchExamsByUser({ search, currentPage, limit, sortOrder }));
  }, [dispatch, search, currentPage, limit, sortOrder]);

  useEffect(() => {
    console.log('Exams:', exams);
  }, [exams]);

  const tabs = useMemo(
    () => [
      { id: 'all', label: 'Tất cả' },
      { id: 'grade_10', label: 'Lớp 10' },
      { id: 'grade_11', label: 'Lớp 11' },
      { id: 'grade_12', label: 'Lớp 12' },
    ],
    [],
  );

  const renderExamItem = useCallback(
    ({ item }) => (
      <ExamCard
        name={item.name}
        imageUrl={item.imageUrl}
        onPress={() => console.log('Đề thi:', item.name)}
      />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <AppText style={styles.header}>Luyện đề</AppText>

      <View style={styles.row}>
        <SearchBar />

        {/* Nút filter */}
        <Button
          iconComponent={
            <Image
              source={require('../../../assets/icons/filter-icon-primary.png')}
              style={{ width: 24, height: 24 }}
            />
          }
          style={styles.button}
          onPress={() => console.log('Filter Clicked!')}
        />
      </View>

      <TabNavigation
        tabs={tabs}
        selectedTab={selectedGrade}
        onTabPress={setSelectedGrade}
      />

      {/* Danh sách lớp học dạng lưới */}
      <FlatList
        data={filteredExam}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.classList}
        columnWrapperStyle={styles.classRow}
        ListEmptyComponent={
          <AppText style={styles.emptyText}>Không có đề thi nào</AppText>
        }
        renderItem={renderExamItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sky.lightest,
    padding: 20,
    gap: 10,
  },
  header: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: colors.ink.darkest,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    width: 48,
    borderRadius: 18,
  },
  classList: {
    gap: 0,
  },
  classRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
});
