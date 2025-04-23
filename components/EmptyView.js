import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from './AppText';
import colors from '../constants/colors';
import Button from './button/Button';

const EmptyView = ({
  onRefresh,
  isLoading,
  error,
  loadingMessage,
  emptyMessage,
}) => {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <AppText style={styles.loadingMessage}>
            {loadingMessage || 'Đang tải dữ liệu...'}
          </AppText>
        </>
      ) : error ? (
        <>
          <Feather name="alert-circle" size={48} color={colors.warning} />
          <AppText style={styles.errorMessage}>{error}</AppText>
          <Button text="Tải lại" onpress={onRefresh} />
        </>
      ) : (
        <>
          <Feather name="inbox" size={48} color={colors.sky.base} />
          <AppText style={styles.emptyMessage}>
            {emptyMessage || 'Không có dữ liệu'}
          </AppText>
        </>
      )}

      {onRefresh && !isLoading && (
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <Feather name="refresh-cw" size={16} color={colors.sky.white} />

          <AppText style={styles.refreshText}>Làm mới</AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 200,
    gap: 12,
  },
  loadingMessage: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.ink.base,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.sky.base,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.warning,
    textAlign: 'center',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
    marginTop: 8,
  },
  refreshText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.sky.white,
  },
});

export default EmptyView;
