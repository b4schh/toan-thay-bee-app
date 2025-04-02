import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AppText from '../AppText';
import colors from '../../constants/colors';
import Feather from '@expo/vector-icons/Feather';

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = 'Chọn một mục',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.code === value);

  return (
    <View style={styles.container}>
      {label && <AppText style={styles.label}>{label}</AppText>}

      <TouchableOpacity
        style={[styles.header, isOpen && styles.headerActive]}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <AppText
          style={[styles.selectedText, !selectedOption && styles.placeholder]}
        >
          {selectedOption ? selectedOption.description : placeholder}
        </AppText>
        <AppText style={styles.arrow}>
          {isOpen ? (
            <Feather name="chevron-up" size={24} color="black" />
          ) : (
            <Feather name="chevron-down" size={24} color="black" />
          )}
        </AppText>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={[styles.optionsContainer]}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.code}
                style={[
                  styles.option,
                  value === option.code && styles.optionSelected,
                ]}
                onPress={() => {
                  onChange(option.code);
                  setIsOpen(false);
                }}
              >
                <AppText
                  style={[
                    styles.optionText,
                    value === option.code && styles.selectedOption,
                  ]}
                >
                  {option.description}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: colors.ink.dark,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.sky.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.sky.dark,
  },
  headerActive: {
    borderColor: colors.ink.base,
  },
  selectedText: {
    color: colors.ink.dark,
  },
  placeholder: {
    color: colors.ink.lighter,
  },
  arrow: {
    fontSize: 12,
    color: colors.ink.dark,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  optionsContainer: {
    backgroundColor: colors.sky.white,
    borderRadius: 8,
    maxHeight: '80%',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.sky.lighter,
  },
  optionSelected: {
    backgroundColor: colors.sky.lighter,
  },
  optionText: {
    color: colors.ink.dark,
  },
  selectedOption: {
    color: colors.primary.default,
    fontFamily: 'Inter-Bold',
  },
});
