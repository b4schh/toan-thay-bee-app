// import React from 'react';
// import { View, StyleSheet, ActivityIndicator } from 'react-native';
// import { WebView } from 'react-native-webview';
// import colors from 'constants/colors';

// const PdfWebView = ({ source }) => {
//   const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(source)}`;

//   return (
//     <View style={styles.container}>
//       <WebView
//         source={{ uri: source }}
//         style={{ flex: 1 }}
//         startInLoadingState
//         renderLoading={() => (
//           <ActivityIndicator size="large" color={colors.primary} />
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default PdfWebView;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const PdfWebView = ({source}) => {
  console.log(source);
  
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