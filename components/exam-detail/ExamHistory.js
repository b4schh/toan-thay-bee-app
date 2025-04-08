import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from '../../components/AppText';

export default function ExamHistory({ attempts, onViewResult }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header với tiêu đề và icon */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded((prev) => !prev)}
      >
        <AppText style={styles.headerText}>Lịch sử làm bài</AppText>
        <Feather
          name={isExpanded ? 'chevron-down' : 'chevron-right'}
          size={20}
          color="#333"
        />
      </TouchableOpacity>

      {/* Hiển thị bảng nếu isExpanded = true */}
      {isExpanded && (
        <View style={styles.tableContainer}>
          <View style={styles.tableBody}>
            <View style={[styles.row, styles.headerRow]}>
              <AppText style={[styles.headerCell, styles.idCell]}>#</AppText>
              <AppText style={[styles.headerCell, styles.contentCell]}>Điểm</AppText>
              <AppText style={[styles.headerCell, styles.contentCell]}>Thời gian làm</AppText>
              <AppText style={[styles.headerCell, styles.contentCell]}>Thời gian nộp</AppText>
            </View>
            {attempts.length > 0 ? (
              <FlatList
                data={attempts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => onViewResult(item.id)}>
                    <View style={styles.row}>
                      <AppText style={[styles.cell, styles.idCell]}>{item.id}</AppText>
                      <AppText style={[styles.cell, styles.contentCell]}>{item.score}</AppText>
                      <AppText style={[styles.cell, styles.contentCell]}>{item.duration}</AppText>
                      <AppText style={[styles.cell, styles.contentCell]}>
                        {new Date(item.endTime).toLocaleString('vi-VN')}
                      </AppText>
                    </View>
                  </TouchableOpacity>
                )}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <AppText style={{ textAlign: 'center', marginVertical: 8 }}>
                Không có lịch sử làm bài
              </AppText>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tableContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    flex: 1,
    marginBottom: 70,
  },
  tableBody: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    flex: 1,
    
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  headerRow: {
    backgroundColor: '#f2f2f2',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  idCell: {
    flex: 0.5,
  },
  contentCell: {
    flex: 1.5,
  },
});