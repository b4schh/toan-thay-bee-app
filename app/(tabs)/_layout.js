// app/(tabs)/_layout.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, Image, View } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../constants/colors';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <Tabs
      screenOptions={{
        keyboardHidesTabBar: true,
        tabBarActiveTintColor: '#253F61',
        tabBarInactiveTintColor: '#9DB2CE',
        tabBarItemStyle: {
          flexDirection: 'column', // Sắp xếp icon và label theo chiều dọc
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 0,
          paddingVertical: 12,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          // marginTop: 5,
        },
        // Thêm paddingBottom và điều chỉnh chiều cao tab bar dựa vào insets.bottom
        tabBarStyle: {
          position: 'absolute',
          zIndex: 99,
          backgroundColor: '#ffffff',
          paddingBottom: insets.bottom,
          height: 80 + insets.bottom,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          overflow: 'visible',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../../assets/tab-bar-icon/home-active-icon.png')
                  : require('../../assets/tab-bar-icon/home-inactive-icon.png')
              }
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="docs/index"
        options={{
          title: 'Tài liệu',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../../assets/tab-bar-icon/docs-active-icon.png')
                  : require('../../assets/tab-bar-icon/docs-inactive-icon.png')
              }
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="classroom"
        options={{
          title: '',
          tabBarItemStyle: {
            // marginTop: 21,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                backgroundColor: colors.primary,
                width: size * 2.5, // tăng kích thước
                height: size * 2.5,
                borderRadius: (size * 3) / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={
                  focused
                    ? require('../../assets/tab-bar-icon/classroom-active-icon.png')
                    : require('../../assets/tab-bar-icon/classroom-inactive-icon.png')
                }
                style={{ width: size * 1.5, height: size * 1.5 }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Luyện đề',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../../assets/tab-bar-icon/practice-active-icon.png')
                  : require('../../assets/tab-bar-icon/practice-inactive-icon.png')
              }
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../../assets/tab-bar-icon/user-active-icon.png')
                  : require('../../assets/tab-bar-icon/user-inactive-icon.png')
              }
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
    // </SafeAreaView>
  );
}
