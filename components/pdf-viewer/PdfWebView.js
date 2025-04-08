import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import colors from '../../constants/colors';

export default function PdfWebView({ source }) {
  const encodedURI = encodeURIComponent(source);
  const googleViewer = `https://docs.google.com/viewer?embedded=true&url=${encodedURI}`;
  const pdfViewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodedURI}`;
  console.log(googleViewer);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: googleViewer }}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator size="large" color={colors.primary} />
        )}
      />
    </View>
  );
}
