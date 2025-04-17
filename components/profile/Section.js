import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <AppText style={styles.sectionTitle}>{title}</AppText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.sky.white,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: colors.ink.darkest,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.ink.darkest,
    marginVertical: 12,
  },
});