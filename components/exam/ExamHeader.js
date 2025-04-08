import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button  from '../button/Button';
import colors from '../../constants/colors';

export default function ExamHeader({ examName, remainingTime, onMenuPress }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.examName}>{examName.toUpperCase()}</Text>
      <Text style={styles.timer}>{remainingTime} phút</Text>
      <Button
        icon="menu"
        iconLibrary="Feather"
        iconColor={colors.ink.darkest}
        style={styles.menuButton}
        onPress={onMenuPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  examName: {
    flex: 1,
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.ink.darkest,
    textAlign: 'left',
    lineHeight: 30,
  },
  timer: {
    fontSize: 16,
  },
  menuButton: {
    width: 'auto',
    height: 'auto',
    backgroundColor: 'transparent',
    marginTop: 3,
  },
});