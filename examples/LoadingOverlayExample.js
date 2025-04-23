import React, { useState, useEffect } from 'react';
import { View, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { setLoading } from '../features/state/stateApiSlice';
import { LoadingOverlay, AppText } from '@components/index';

const LoadingOverlayExample = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    // Set loading state
    dispatch(setLoading(true));
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success or error (randomly)
      const random = Math.random();
      if (random > 0.3) {
        setData({ items: ['Item 1', 'Item 2', 'Item 3'] });
      } else {
        throw new Error('Failed to load data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#4285F4']}
          />
        }
      >
        {data ? (
          data.items.map((item, index) => (
            <View key={index} style={styles.item}>
              <AppText>{item}</AppText>
            </View>
          ))
        ) : !error ? (
          <AppText>Pull down to refresh</AppText>
        ) : null}
      </ScrollView>

      {/* Loading overlay with message */}
      <LoadingOverlay 
        message="Loading data..."
        error={error}
        onRetry={fetchData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
});

export default LoadingOverlayExample;
