// SearchBar.js
import React, { memo } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from '../constants/colors';

const SearchBar = ({ onSearch }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={colors.ink.darkest} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm..."
        onChangeText={onSearch}
        returnKeyType="search"
      />
    </View>
  );
};

export default memo(SearchBar); // Dùng memo để tránh re-render không cần thiết

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: colors.sky.light,
    backgroundColor: colors.sky.lighter,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
  },
});
