import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import AppText from './AppText';
import colors from '../constants/colors';

export default function TabNavigation({ tabs, selectedTab, onTabPress }) {
  return (
    <View style={styles.navBar}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              selectedTab === tab.id && styles.activeTab,
            ]}
            onPress={() => onTabPress(tab.id)}
          >
            <AppText
              style={[
                styles.tabText,
                selectedTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.label}
            </AppText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    gap: 10,
  },
  navBar: {
    flexDirection: 'row',
    gap: 12,
  },
  tabButton: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 99,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.primary,
    textAlignVertical: 'center',
  },
  activeTabText: {
    color: colors.sky.white,
  },
});
