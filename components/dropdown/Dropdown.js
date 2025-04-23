import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AppText from '../AppText';
import colors from '../../constants/colors';
import Feather from '@expo/vector-icons/Feather';
import { MaterialIcons } from '@expo/vector-icons'; // Thêm icon cho checkbox và radio button

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = 'Chọn một mục',
  disabled = false,
  multiSelect = false, // Thêm prop để hỗ trợ multi-select
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionPress = (optionCode) => {
    if (multiSelect) {
      // Xử lý chọn nhiều lựa chọn
      if (value.includes(optionCode)) {
        onChange(value.filter((code) => code !== optionCode));
      } else {
        onChange([...value, optionCode]);
      }
    } else {
      // Xử lý chọn một lựa chọn
      onChange(optionCode);
      setIsOpen(false);
    }
  };

  const selectedOptions = multiSelect
    ? (options?.filter((opt) => value.includes(opt.code)) || [])
    : options.find((opt) => opt.code === value);

  return (
    <View style={styles.container}>
      {label && <AppText style={styles.label}>{label}</AppText>}

      <TouchableOpacity
        style={[
          styles.header,
          isOpen && styles.headerActive,
          disabled && styles.headerDisabled,
        ]}
        onPress={disabled ? null : () => setIsOpen(!isOpen)}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <AppText
          style={[
            styles.selectedText,
            (!selectedOptions || (multiSelect && selectedOptions.length === 0)) &&
              styles.placeholder,
          ]}
        >
          {multiSelect
            ? selectedOptions.map((opt) => opt.description).join(', ') ||
              placeholder
            : selectedOptions?.description || placeholder}
        </AppText>
        <AppText style={styles.arrow}>
          {isOpen ? (
            <Feather name="chevron-up" size={24} color="black" />
          ) : (
            <Feather name="chevron-down" size={24} color="black" />
          )}
        </AppText>
      </TouchableOpacity>

      {isOpen && (
        (() => {
          const validOptions = Array.isArray(options) ? options : [];

          return (
            <ScrollView style={styles.optionsContainer}>
              {validOptions.map((option) => {
                const isSelected = multiSelect
                  ? value.includes(option.code)
                  : value === option.code;

                return (
                  <TouchableOpacity
                    key={option.code}
                    style={[
                      styles.option,
                      isSelected && styles.optionSelected,
                    ]}
                    onPress={() => handleOptionPress(option.code)}
                  >
                    <View style={styles.iconContainer}>
                      {multiSelect ? (
                        <MaterialIcons
                          name={isSelected ? 'check-box' : 'check-box-outline-blank'}
                          size={20}
                          color={isSelected ? colors.primary.default : colors.ink.light}
                        />
                      ) : (
                        <MaterialIcons
                          name={isSelected ? 'radio-button-checked' : 'radio-button-unchecked'}
                          size={20}
                          color={isSelected ? colors.primary.default : colors.ink.light}
                        />
                      )}
                    </View>
                    <AppText
                      style={[
                        styles.optionText,
                        isSelected && styles.selectedOption,
                      ]}
                    >
                      {option.description}
                    </AppText>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          );
        })()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    borderColor: colors.sky.base,
  },
  headerActive: {
    borderColor: colors.ink.base,
  },
  headerDisabled: {
    backgroundColor: colors.sky.lightest,
    borderColor: colors.sky.light,
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
  optionsContainer: {
    backgroundColor: colors.sky.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.sky.base,
    marginTop: 5,
    maxHeight: 180,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  optionSelected: {
    backgroundColor: colors.sky.lighter,
  },
  iconContainer: {
    marginRight: 10,
  },
  optionText: {
    color: colors.ink.dark,
  },
  selectedOption: {
    color: colors.primary.default,
    fontFamily: 'Inter-Bold',
  },
});
