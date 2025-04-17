import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function MenuItem({ icon, text, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemContent}>
        <Feather name={icon} size={20} color={colors.primary} />
        <AppText style={styles.menuItemText}>{text}</AppText>
      </View>
      <Feather name="chevron-right" size={20} color={colors.ink.darker} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.sky.lighter,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: colors.ink.darkest,
    marginLeft: 12,
  },
});