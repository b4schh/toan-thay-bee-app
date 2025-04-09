import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import AppText from '../AppText';
import MyMathText from '@components/latex/MyMathText';

export default function QuestionContent({
  sectionTitle,
  questionNumber,
  questionContent,
  questionImage,
}) {
  return (
    <View>
      <AppText style={styles.sectionTitle}>{sectionTitle}</AppText>
      <AppText style={styles.questionNumber}>Câu {questionNumber}:</AppText>
      <MyMathText statement={questionContent}/>
      {/* <AppText style={styles.questionContent}>{questionContent}</AppText> */}
      {questionImage && (
        <Image source={{ uri: questionImage }} style={styles.questionImage} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#202325',
    textAlign: 'center',
    marginBottom: 4,
  },
  questionNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#202325',
  },
  questionContent: {
    fontSize: 18,
    color: '#333',
    marginVertical: 4,
  },
  questionImage: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    borderRadius: 8,
  },
});
