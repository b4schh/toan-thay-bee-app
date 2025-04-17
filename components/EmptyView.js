import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from './AppText';
import colors from '../constants/colors';

const EmptyView = ({ onRefresh, isLoading, error, message }) => {
  return (
    <View style={styles.container}>
      {error ? (
        <>
          <Feather name="alert-circle" size={48} color={colors.warning} />
          <AppText style={styles.errorText}>{error}</AppText>
        </>
      ) : (
        <>
          <Feather name="inbox" size={48} color={colors.ink.light} />
          <AppText style={styles.emptyText}>{message || 'Không có dữ liệu'}</AppText>
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
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.ink.light,
    textAlign: 'center',
  },
  errorText: {
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