import { useSelector } from 'react-redux';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const LoadingOverlay = () => {
  const { loading } = useSelector((state) => state.states);

  if (!loading) return null; // Không hiển thị nếu không đang loading

  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

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
  },
});
export default LoadingOverlay;
