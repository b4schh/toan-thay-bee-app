import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from './AppText';
import colors from '../constants/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const delta = 2; // Số trang hiển thị bên trái và phải của trang hiện tại

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Luôn hiển thị trang đầu
        i === totalPages || // Luôn hiển thị trang cuối
        (i >= currentPage - delta && i <= currentPage + delta) // Hiển thị các trang xung quanh trang hiện tại
      ) {
        if (pages.length > 0 && i > pages[pages.length - 1] + 1) {
          // Thêm dấu ... nếu có khoảng cách
          pages.push(
            <View key={`ellipsis-${i}`} style={styles.ellipsis}>
              <AppText style={styles.ellipsisText}>...</AppText>
            </View>
          );
        }
        pages.push(
          <TouchableOpacity
            key={i}
            onPress={() => onPageChange(i)}
            style={[styles.pageButton, currentPage === i && styles.activePageButton]}
          >
            <AppText
              style={[styles.pageText, currentPage === i && styles.activePageText]}
            >
              {i}
            </AppText>
          </TouchableOpacity>
        );
      }
    }
    return pages;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={[styles.arrowButton, currentPage === 1 && styles.disabledButton]}
      >
        <FontAwesomeIcon
          name="chevron-left"
          size={16}
          color={currentPage === 1 ? colors.sky.dark : colors.primary}
        />
      </TouchableOpacity>

      <View style={styles.pageNumbers}>{renderPageNumbers()}</View>

      <TouchableOpacity
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={[styles.arrowButton, currentPage === totalPages && styles.disabledButton]}
      >
        <FontAwesomeIcon
          name="chevron-right"
          size={16}
          color={currentPage === totalPages ? colors.sky.dark : colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  pageNumbers: {
    flexDirection: 'row',
    gap: 8,
  },
  pageButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.sky.white,
  },
  activePageButton: {
    backgroundColor: colors.primary,
  },
  pageText: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  activePageText: {
    color: colors.sky.white,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.sky.white,
  },
  disabledButton: {
    backgroundColor: colors.sky.lighter,
  },
  ellipsis: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ellipsisText: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});

export default Pagination;