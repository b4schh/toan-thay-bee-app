import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const PdfWebView = ({source}) => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: source }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default PdfWebView;
