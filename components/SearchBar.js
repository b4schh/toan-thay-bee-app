import React, { useState, memo, useEffect, useCallback, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setScreenSearch } from '../features/filter/filterSlice';
import colors from '../constants/colors';

const SearchBar = memo(({ placeholder, screen }) => {
  const dispatch = useDispatch();
  const { screens } = useSelector((state) => state.filter);
  const [searchText, setSearchText] = useState(screens[screen]?.search || '');
  const timeoutRef = useRef(null);

  // Sync với global state khi component mount hoặc screen thay đổi
  useEffect(() => {
    setSearchText(screens[screen]?.search || '');
  }, [screen, screens[screen]?.search]);

  // Cleanup timeout khi component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSearch = (text) => setSearchText(text);

  const handleClear = useCallback(() => {
    setSearchText('');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    dispatch(
      setScreenSearch({
        screen,
        search: '',
      }),
    );
  }, [dispatch, screen]);

  const handleBlur = useCallback(() => {
    dispatch(
      setScreenSearch({
        screen,
        search: searchText.trim(),
      }),
    );
  }, [dispatch, screen, searchText]);

  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color={colors.ink.darkest}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.ink.light}
        value={searchText}
        onChangeText={(text) => handleSearch(text)}
        onBlur={handleBlur}
        returnKeyType="search"
      />
      {searchText ? (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color={colors.ink.light} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: colors.sky.light,
    backgroundColor: colors.sky.lighter,
    elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.ink.darkest,
  },
  clearButton: {
    padding: 4,
  },
});

// Add display name for debugging
SearchBar.displayName = 'SearchBar';

export default SearchBar;
