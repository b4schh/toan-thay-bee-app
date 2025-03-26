import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from './AppText';
import Button from './Button';
import colors from '../constants/colors';

export default function CustomModal({
  visible,
  title,
  children,
  actions = [],
  onClose,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Tiêu đề */}
          {title && <AppText style={styles.modalTitle}>{title}</AppText>}

          {/* Nội dung tùy chỉnh */}
          {children && <View style={styles.content}>{children}</View>}

          {/* Các nút hành động */}
          {actions.length > 0 && (
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
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 340,
    backgroundColor: colors.sky.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    textAlign: 'center',
    maxWidth: 200,
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
    flex: 1
  }
});
