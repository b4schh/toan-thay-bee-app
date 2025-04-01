import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import AppText from '../AppText';
import Button from '../button/Button';
import colors from '../../constants/colors';

export default function Dialog({
  visible,
  title,
  message,
  children,
  actions = [],
  onClose,
  type = 'custom', // 'alert' | 'custom'
}) {
  const renderActions = () => {
    if (type === 'alert') {
      return (
        <Button 
          text="OK" 
          onPress={onClose} 
          style={styles.button} 
        />
      );
    }

    return (
      <View style={styles.buttonRow}>
        {actions.map((action, index) => (
          <Button
            key={index}
            text={action.text}
            onPress={action.onPress}
            style={[styles.button, action.style]}
            textStyle={action.textStyle}
          />
        ))}
      </View>
    );
  };

  return (
    <Modal 
      isVisible={visible} 
      onBackdropPress={onClose}
      animationType="fade"
      useNativeDriver
    >
      <View style={[
        styles.modalContainer,
        type === 'alert' && styles.alertContainer
      ]}>
        {title && (
          <AppText style={styles.title}>{title}</AppText>
        )}
        
        {message && (
          <AppText style={styles.message}>{message}</AppText>
        )}

        {children && (
          <View style={styles.content}>
            {children}
          </View>
        )}

        {renderActions()}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.sky.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    gap: 10,
  },
  alertContainer: {
    maxWidth: 340,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    marginBottom: 16,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
  },
});