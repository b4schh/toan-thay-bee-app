import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppText from '../AppText';
import Button from '../button/Button';
import colors from '../../constants/colors';

export default function ExamHeader({ examName, remainingTime, onMenuPress }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.subContainer}>
        <Text style={styles.examName}>{examName.toUpperCase()}</Text>
        <Button
          icon="menu"
          iconLibrary="Feather"
          iconColor={colors.ink.darkest}
          style={styles.menuButton}
          onPress={onMenuPress}
        />
      </View>
      <View style={styles.timeContainer}>
        <AppText style={{ fontFamily: 'Inter-Bold', fontSize: 18 }}>
          Thời gian còn lại
        </AppText>
        <AppText style={styles.timer}>⏳ {remainingTime}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  examName: {
    flex: 1,
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.ink.darkest,
    textAlign: 'left',
    lineHeight: 30,
  },
  timeContainer: {
    alignItems: 'center',
    padding: 8,
    // gap: 4,
  },
  timer: {
    fontSize: 18,
    color: colors.danger,
    fontFamily: 'Inter-Bold',
  },
  menuButton: {
    width: 'auto',
    height: 'auto',
    backgroundColor: 'transparent',
    marginTop: 3,
  },
});
