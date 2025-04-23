import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Path, Circle, Ellipse } from 'react-native-svg';
import colors from '../../constants/colors';

export default function BeeMathLogo({ style }) {
  return (
    <View style={[styles.container, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        {/* Thân con ong - hình oval */}
        <Ellipse
          cx="50"
          cy="50"
          rx="35"
          ry="30"
          fill={colors.primary}
        />

        {/* Sọc ong */}
        <Path
          d="M30 40C40 40 60 40 70 40"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.1"
        />
        <Path
          d="M25 50C40 50 60 50 75 50"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.1"
        />
        <Path
          d="M30 60C40 60 60 60 70 60"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.1"
        />

        {/* Cánh ong */}
        <Ellipse
          cx="75"
          cy="40"
          rx="18"
          ry="15"
          fill="#FFD700"
          opacity="0.8"
          transform="rotate(-15)"
        />
        <Ellipse
          cx="25"
          cy="40"
          rx="18"
          ry="15"
          fill="#FFD700"
          opacity="0.8"
          transform="rotate(15)"
        />

        {/* Mắt con ong */}
        <Circle cx="40" cy="45" r="5" fill="white" />
        <Circle cx="60" cy="45" r="5" fill="white" />
        <Circle cx="40" cy="45" r="2.5" fill="black" />
        <Circle cx="60" cy="45" r="2.5" fill="black" />

        {/* Nụ cười */}
        <Path
          d="M42 55C46 60 54 60 58 55"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Râu ong */}
        <Path
          d="M35 35C30 30 25 28 20 30"
          stroke="#FFD700"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Path
          d="M65 35C70 30 75 28 80 30"
          stroke="#FFD700"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Nốt đỏ trên má */}
        <Circle cx="35" cy="50" r="2" fill="#FFB6C1" opacity="0.6" />
        <Circle cx="65" cy="50" r="2" fill="#FFB6C1" opacity="0.6" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    width: '100%',
    height: '100%',
  },
});