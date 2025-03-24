import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
// import Katex from 'react-native-katex';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicQuestionsByExamId } from '../../../../features/question/questionSlice';
import { fetchAnswersByAttempt } from '../../../../features/answer/answerSlice';
import { getAnswersByAttemptAPI } from '../../../../services/answerApi';
import { EXAM_QUESTION_DATA } from '../../../../const_data/exam-question-data';
import colors from '../../../../constants/colors';

export default function DoExamScreen() {
  const { id } = useLocalSearchParams();
  const { questions } = useSelector((state) => state.questions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPublicQuestionsByExamId(id));
  }, [dispatch, id]);


  useEffect(() => console.log(questions), [questions]);

  return <View></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  duration: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  katex: {
    marginVertical: 10,
  },
  katexOption: {
    flex: 1,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
  },
  radioCircleSelected: {
    backgroundColor: '#00f',
  },
  trueFalseContainer: {
    marginVertical: 10,
  },
  trueFalseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  choiceButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  choiceButtonSelected: {
    backgroundColor: '#0f0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
});
