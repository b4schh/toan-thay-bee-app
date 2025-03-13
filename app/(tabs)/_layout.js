// app/(tabs)/_layout.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, Image, View } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#253F61',
        tabBarInactiveTintColor: '#9DB2CE',
        tabBarItemStyle: {
          // flexDirection: 'column', // Sắp xếp icon và label theo chiều dọc
          // alignItems: 'center',
          // justifyContent: 'center',
          paddingHorizontal: 0,
          paddingVertical: 12,
        },
        tabBarLabelStyle: {
          fontFamily: 'BeVietnamPro-Medium',
          fontSize: 12,
          // marginTop: 5,
        },
        // Thêm paddingBottom và điều chỉnh chiều cao tab bar dựa vào insets.bottom
        tabBarStyle: {
          backgroundColor: '#ffffff',
          paddingBottom: insets.bottom,
          height: 75 + insets.bottom,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
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
        name="docs"
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
            // Dịch toàn bộ container (bao gồm hit area) lên trên
            marginTop: -4,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                backgroundColor: '#253F61',
                width: size * 3, // tăng kích thước
                height: size * 3,
                borderRadius: (size * 3) / 2,
                alignItems: 'center',
                justifyContent: 'center',
                // Thêm border
                borderWidth: 8,
                borderColor: '#fff',
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
    </Tabs>
    // </SafeAreaView>
  );
}
