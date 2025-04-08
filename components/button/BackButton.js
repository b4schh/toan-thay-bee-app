import * as React from 'react';
import { StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const ChevronLeftIcon = () => {
  return <Feather name="chevron-left" size={24} color="black" />;
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default ChevronLeftIcon;
