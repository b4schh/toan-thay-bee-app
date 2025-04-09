import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppText,
  Button,
  ExamResultOverlay,
  LoadingOverlay,
  QuestionSection,
  TNSection,
  DSSection,
  TLNSection,
} from '@components/index';
import colors from '../../../constants/colors';
import { fetchQuestionAndAnswersByAttempt } from '../../../features/answer/answerSlice';

export default function ExamResultScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isResultOverlayVisible, setResultOverlayVisible] = useState(false);
  const { exam } = useSelector((state) => state.exams);
  const dispatch = useDispatch();
  const { answers, score } = useSelector((state) => state.answers);
  const { questions } = useSelector((state) => state.questions);
  const { loading } = useSelector((state) => state.states);

  const [questionTN, setQuestionTN] = useState([]);
  const [questionDS, setQuestionDS] = useState([]);
  const [questionTLN, setQuestionTLN] = useState([]);

  const [answersDS, setAnswersDS] = useState({});
  const [answersTNTLN, setAnswersTNTLN] = useState({});

  const [shownSolutions, setShownSolutions] = useState({});
  const prefixStatementTN = ['A.', 'B.', 'C.', 'D.'];
  const prefixStatementDS = ['a)', 'b)', 'c)', 'd)'];

  useEffect(() => {
    if (questions) {
      setQuestionTN(
        questions.filter((question) => question.typeOfQuestion === 'TN'),
      );
      setQuestionDS(
        questions.filter((question) => question.typeOfQuestion === 'DS'),
      );
      setQuestionTLN(
        questions.filter((question) => question.typeOfQuestion === 'TLN'),
      );
    }
  }, [questions]);

  useEffect(() => {
    const dsAnswers = {};
    const dsAnswersTNTLN = {};
    answers.forEach((answer) => {
      if (answer.typeOfQuestion === 'DS') {
        try {
          if (!answer.answerContent) return;
          const parsed = JSON.parse(answer.answerContent); // là mảng

          parsed.forEach((item) => {
            dsAnswers[item.statementId] = item.answer; // ví dụ: { 225: false, 226: false, ... }
          });
        } catch (err) {
          console.error('Lỗi parse answerContent:', err);
        }
      } else {
        dsAnswersTNTLN[answer.questionId] = {
          result: answer.result,
          answer: answer.answerContent,
        };
      }
    });
    setAnswersDS(dsAnswers);
    setAnswersTNTLN(dsAnswersTNTLN);
  }, [answers]);

  const toggleSolution = (questionId) => {
    setShownSolutions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchQuestionAndAnswersByAttempt({ attemptId: id }));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <LoadingOverlay />
        <AppText style={{ fontSize: 16, alignItems: 'center' }}>
          Đang tải....
        </AppText>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <AppText
          style={styles.headerText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          KẾT QUẢ
        </AppText>
        <Button
          icon="menu"
          iconLibrary="Feather"
          iconColor={colors.ink.darkest}
          style={[
            {
              width: 'auto',
              height: 'auto',
              backgroundColor: 'transparent',
              marginTop: 3,
            },
          ]}
          onPress={() => setResultOverlayVisible(true)} // Sửa lại để mở ExamResultOverlay
        />
      </View>

      <ScrollView style={styles.container}>
        <AppText style={styles.examName}>{exam?.name.toUpperCase()}</AppText>

        <TNSection
          questions={questionTN}
          answers={answersTNTLN}
          toggleSolution={toggleSolution}
          shownSolutions={shownSolutions}
          prefixStatement={prefixStatementTN}
        />

        <DSSection
          questions={questionDS}
          answers={answersDS}
          toggleSolution={toggleSolution}
          shownSolutions={shownSolutions}
          prefixStatement={prefixStatementDS}
        />

        <TLNSection
          questions={questionTLN}
          answers={answersTNTLN}
          toggleSolution={toggleSolution}
          shownSolutions={shownSolutions}
        />

        <Button
          text="Trở về trang chủ"
          onPress={() => router.replace('/practice')}
          style={{ marginTop: 20, marginBottom: 20 }}
        />
      </ScrollView>

      <ExamResultOverlay
        visible={isResultOverlayVisible}
        onClose={() => setResultOverlayVisible(false)}
        questionTN={questionTN}
        questionDS={questionDS}
        questionTLN={questionTLN}
        answersTNTLN={answersTNTLN}
        answersDS={answersDS}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.sky.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Đẩy button sang phải
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.sky.lighter,
  },
  headerText: {
    flex: 1,
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.ink.darkest,
    lineHeight: 30,
  },
  container: {
    flex: 1,
    backgroundColor: colors.sky.lightest,
    padding: 20,
    gap: 16,
  },
  examName: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    color: colors.ink.darkest,
    fontSize: 20,
    marginBottom: 12,
  },
});
