import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import LessonDetails from './LessonDetail';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function LessonDropdown({ lesson }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <View style={[styles.container, expanded && styles.activeContainer]}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => setExpanded(!expanded)}
        >
          <FontAwesome6
            name={expanded ? 'angle-down' : 'angle-right'}
            size={16}
            color={expanded ? colors.sky.white : colors.ink.darkest}
          />
          <AppText style={[styles.title, expanded && styles.activeText]}>
            {   lesson.name}
          </AppText>
        </TouchableOpacity>
      </View>
        {expanded && <LessonDetails lesson={lesson} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.sky.light,
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginLeft: 10,
  },
  activeContainer: {
    backgroundColor: colors.primary,
  },
  activeText: {
    color: colors.sky.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
});
