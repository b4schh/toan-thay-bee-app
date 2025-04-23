import React, { useState, memo, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setScreenSearch } from '../features/filter/filterSlice';
import colors from '../constants/colors';

const SearchBar = memo(({ placeholder = 'Tìm kiếm...', screen }) => {
  const dispatch = useDispatch();
  const { screens } = useSelector((state) => state.filter);

  const initialSearchText = useMemo(() => screens[screen]?.search || '', [screen, screens]);
  const [searchText, setSearchText] = useState(initialSearchText);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setSearchText(screens[screen]?.search || '');
  }, [screen, screens]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(
        setScreenSearch({
          screen,
          search: text.trim(),
        }),
      );
    }, 300); // Debounce 300ms
  };

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
    if (searchText.trim() !== screens[screen]?.search) {
      dispatch(
        setScreenSearch({
          screen,
          search: searchText.trim(),
        }),
      );
    }
  }, [dispatch, screen, searchText, screens]);

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
        accessible={true}
        accessibilityLabel="Search input"
      />
      {searchText ? (
        <TouchableOpacity
          onPress={handleClear}
          style={styles.clearButton}
          accessible={true}
          accessibilityLabel="Clear search text"
        >
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

SearchBar.displayName = 'SearchBar';

export default SearchBar;
