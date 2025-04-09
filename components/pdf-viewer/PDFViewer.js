// import React from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import PDFView from 'react-native-view-pdf';

// const PDFViewer = ({ source }) => {
//   return (
//     <View style={styles.container}>
//       <PDFView
//         fadeInDuration={250.0}
//         style={styles.pdf}
//         resource={source}
//         resourceType="url"
//         onLoad={() => console.log('PDF loaded')}
//         onError={(error) => console.log('PDF error:', error)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   pdf: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   }
// });

// export default PDFViewer;