import React, { memo, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../../constants/colors';

const LoadingOverlay = memo(({ 
  color = colors.primary,
  size = 'large',
  opacity = 0.7,
  testID = 'loading-overlay'
}) => {
  const { loading } = useSelector((state) => state.states);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: loading ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [loading]);

  if (!loading) return null;

  return (
    <Animated.View 
      style={[
        styles.loadingOverlay, 
        { opacity: fadeAnim }
      ]}
      testID={testID}
      accessible={true}
      accessibilityLabel="Loading indicator"
    >
      <ActivityIndicator size={size} color={color} />
    </Animated.View>
  );
});

LoadingOverlay.displayName = 'LoadingOverlay';

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 9999,
  },
});

export default LoadingOverlay;