import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

const Chip = ({ label, onClose }) => (
  <View style={styles.chip}>
    <Text style={styles.text}>{label}</Text>
    <TouchableOpacity onPress={onClose}>
      <Ionicons name="close" size={16} color={colors.ink.darkest} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.sky.lighter,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    marginRight: 8,
    fontSize: 14,
    color: colors.ink.darkest,
  },
});

export default Chip;