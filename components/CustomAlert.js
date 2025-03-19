// CustomAlert.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button';
import AppText from './AppText';
import Modal from 'react-native-modal';
import colors from '../constants/colors';

const CustomAlert = ({ visible, title, message, onClose }) => {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        {title && <AppText style={styles.title}>{title}</AppText>}
        <AppText style={styles.message}>{message}</AppText>
        <Button text="OK" onPress={onClose} style={styles.button} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.sky.white,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // gap: 10,
  },
  title: {
    fontFamily: 'BeVietnamPro-Bold',
    fontSize: 20,
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 8,
    width: '100%'
  }
});

export default CustomAlert;
