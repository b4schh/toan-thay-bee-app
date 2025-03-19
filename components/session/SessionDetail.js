import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Icons from '@expo/vector-icons';
import AppText from '../AppText';
import colors from '../../constants/colors';

const SessionDetails = ({ session }) => {
  return (
    <View style={styles.content}>
      {session.details.theory && (
        <View style={styles.row}>
          <Icons.Feather name="book" size={20} color={colors.ink.darker} />
          <AppText style={styles.text}>Lý thuyết</AppText>
        </View>
      )}

      {session.details.materials && (
        <View style={styles.row}>
          <Icons.Feather name="youtube" size={20} color={colors.ink.darker} />
          <AppText style={styles.text}>Tài liệu</AppText>
        </View>
      )}

      {session.details.exercises && (
        <View style={styles.row}>
          <Icons.Ionicons
            name="document-text-outline"
            size={20}
            color={colors.ink.darker}
          />
          <AppText style={styles.text}>Bài tập</AppText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  text: {
    fontFamily: 'Inter-Medium',
    marginLeft: 10,
    fontSize: 16,
    color: colors.ink.darker,
  },
});

export default SessionDetails;
