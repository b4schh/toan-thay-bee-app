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

        <View style={styles.section}>
          <AppText style={styles.examName}>Phần I: Trắc nghiệm</AppText>
          <View style={{ flexDirection: 'column', gap: 16 }}>
            {questionTN.map((question, idx) => {
              const userAnswerId = answersTNTLN[question.id]?.answer;
              const isCorrect = answersTNTLN[question.id]?.result;

              return (
                <View
                  key={question.id + 'TN'}
                  style={{
                    gap: 8,
                    borderRadius: 8,
                    padding: 16,
                    backgroundColor: colors.sky.white,
                    elevation: 2,
                  }}
                >
                  {/* Header câu hỏi */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color:
                          isCorrect === true
                            ? colors.success
                            : isCorrect === false
                              ? colors.error
                              : 'orange',
                      }}
                    >
                      Câu {idx + 1}:
                    </Text>
                    {isCorrect === true && (
                      <Text style={{ color: colors.success, fontSize: 18 }}>
                        ✓
                      </Text>
                    )}
                  </View>

                  {/* Nội dung câu hỏi */}
                  <Text>{question.content}</Text>
                  {/* Hình ảnh câu hỏi (nếu có) */}
                  {question.imageUrl && (
                    <Image
                      source={{ uri: question.imageUrl }}
                      style={{
                        width: '100%',
                        height: 200,
                        resizeMode: 'contain',
                        borderRadius: 8,
                      }}
                    />
                  )}

                  {/* Các phương án trả lời */}
                  <View style={{ flexDirection: 'column', gap: 8 }}>
                    {question.statements.map((statement, index) => {
                      const isUserSelected = statement.id == userAnswerId;
                      const isStatementCorrect = statement.isCorrect === true;

                      const color = isStatementCorrect
                        ? colors.success
                        : isUserSelected
                          ? colors.error
                          : 'black';

                      const icon = isStatementCorrect
                        ? '✓'
                        : isUserSelected
                          ? '✗'
                          : null;

                      return (
                        <View
                          key={statement.id}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          <Text style={{ fontWeight: 'bold', color }}>
                            {prefixStatementTN[index]}
                          </Text>
                          <Text style={{ flex: 1, color }}>
                            {statement.content}
                          </Text>
                          {icon && (
                            <Text
                              style={{
                                marginLeft: 8,
                                fontWeight: 'bold',
                                color,
                                fontSize: 16,
                              }}
                            >
                              {icon}
                            </Text>
                          )}
                        </View>
                      );
                    })}
                  </View>

                  {/* Nút hiển thị/ẩn lời giải */}
                  <TouchableOpacity
                    onPress={() => toggleSolution(question.id)}
                    style={{
                      alignSelf: 'flex-start',
                      marginTop: 8,
                      backgroundColor: colors.primary,
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderRadius: 6,
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        fontWeight: '500',
                      }}
                    >
                      {shownSolutions[question.id]
                        ? 'Ẩn lời giải'
                        : 'Hiển thị lời giải'}
                    </Text>
                  </TouchableOpacity>

                  {/* Lời giải */}
                  {shownSolutions[question.id] && (
                    <View
                      style={{
                        marginTop: 10,
                        padding: 12,
                        backgroundColor: '#e5e7eb',
                        borderRadius: 6,
                        gap: 8,
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                        Lời giải:
                      </Text>

                      {question.solution ? (
                        <Text style={{ whiteSpace: 'pre-line' }}>
                          {question.solution}
                        </Text>
                      ) : null}

                      {question.solutionImageUrl && (
                        <Image
                          source={{ uri: question.solutionImageUrl }}
                          style={{
                            width: '100%',
                            height: 200,
                            resizeMode: 'contain',
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#999',
                          }}
                        />
                      )}

                      {question.solutionUrl && (
                        <TouchableOpacity
                          onPress={() => Linking.openURL(question.solutionUrl)}
                        >
                          <Text
                            style={{
                              color: '#3b82f6',
                              textDecorationLine: 'underline',
                            }}
                          >
                            Xem lời giải chi tiết tại đây
                          </Text>
                        </TouchableOpacity>
                      )}

                      {!question.solution &&
                        !question.solutionImageUrl &&
                        !question.solutionUrl && (
                          <Text>Không có lời giải cho câu hỏi này.</Text>
                        )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <AppText style={styles.examName}>Phần II: Đúng sai</AppText>
          <View style={{ flexDirection: 'column', gap: 16 }}>
            {questionDS.map((question, idx) => {
              return (
                <View
                  key={question.id + 'DS'}
                  style={{
                    backgroundColor: 'white',
                    padding: 12,
                    borderRadius: 10,
                    elevation: 2,
                    gap: 10,
                  }}
                >
                  {/* Câu hỏi */}
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    Câu {idx + 1}:
                  </Text>
                  <Text>{question.content}</Text>

                  {question.imageUrl && (
                    <Image
                      source={{ uri: question.imageUrl }}
                      style={{
                        width: '100%',
                        height: 180,
                        resizeMode: 'contain',
                        borderRadius: 8,
                      }}
                    />
                  )}

                  {/* Danh sách mệnh đề */}
                  <View style={{ flexDirection: 'column', gap: 12 }}>
                    {question.statements.map((statement, index) => {
                      const userAnswer = answersDS[statement.id];
                      const isCorrect = userAnswer === statement.isCorrect;

                      return (
                        <View
                          key={statement.id}
                          style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            backgroundColor: isCorrect ? '#dcfce7' : '#fee2e2',
                            borderRadius: 8,
                            padding: 10,
                            gap: 4,
                          }}
                        >
                          {/* Mệnh đề + ảnh (nếu có) */}
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 6,
                              alignItems: 'flex-start',
                            }}
                          >
                            <Text style={{ fontWeight: 'bold' }}>
                              {prefixStatementDS[index]}
                            </Text>
                            <View style={{ flex: 1 }}>
                              <Text>{statement.content}</Text>
                              {statement.imageUrl && (
                                <Image
                                  source={{ uri: statement.imageUrl }}
                                  style={{
                                    width: '100%',
                                    height: 150,
                                    marginTop: 8,
                                    borderRadius: 6,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    resizeMode: 'contain',
                                  }}
                                />
                              )}
                            </View>
                          </View>

                          {/* Trả lời, đáp án, kết quả */}
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 8,
                            }}
                          >
                            <Text>
                              Trả lời:{' '}
                              <Text style={{ fontWeight: 'bold' }}>
                                {userAnswer === true
                                  ? 'Đúng'
                                  : userAnswer === false
                                    ? 'Sai'
                                    : 'Không trả lời'}
                              </Text>
                            </Text>
                            <Text>
                              Đáp án:{' '}
                              <Text style={{ fontWeight: 'bold' }}>
                                {statement.isCorrect === true ? 'Đúng' : 'Sai'}
                              </Text>
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: isCorrect ? 'green' : 'red',
                              }}
                            >
                              {isCorrect ? '✓ Đúng' : '✗ Sai'}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>

                  {/* Nút hiển thị lời giải */}
                  <TouchableOpacity
                    onPress={() => toggleSolution(question.id)}
                    style={{
                      alignSelf: 'flex-start',
                      marginTop: 8,
                      backgroundColor: colors.primary,
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderRadius: 6,
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        fontWeight: '500',
                      }}
                    >
                      {shownSolutions[question.id]
                        ? 'Ẩn lời giải'
                        : 'Hiển thị lời giải'}
                    </Text>
                  </TouchableOpacity>

                  {/* Lời giải */}
                  {shownSolutions[question.id] && (
                    <View
                      style={{
                        marginTop: 10,
                        padding: 12,
                        backgroundColor: '#e5e7eb',
                        borderRadius: 6,
                        gap: 8,
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                        Lời giải:
                      </Text>

                      {question.solution && (
                        <Text style={{ whiteSpace: 'pre-line' }}>
                          {question.solution}
                        </Text>
                      )}

                      {question.solutionImageUrl && (
                        <Image
                          source={{ uri: question.solutionImageUrl }}
                          style={{
                            width: '100%',
                            height: 200,
                            resizeMode: 'contain',
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#999',
                          }}
                        />
                      )}

                      {question.solutionUrl && (
                        <TouchableOpacity
                          onPress={() => Linking.openURL(question.solutionUrl)}
                        >
                          <Text
                            style={{
                              color: '#3b82f6',
                              textDecorationLine: 'underline',
                            }}
                          >
                            Xem lời giải chi tiết tại đây
                          </Text>
                        </TouchableOpacity>
                      )}

                      {!question.solution &&
                        !question.solutionImageUrl &&
                        !question.solutionUrl && (
                          <Text>Không có lời giải cho câu hỏi này.</Text>
                        )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <AppText style={styles.examName}>Phần III: Trả lời ngắn</AppText>
          <View style={{ flexDirection: 'column', gap: 16 }}>
            {questionTLN.map((question, idx) => {
              const userAnswerRaw = answersTNTLN[question.id]?.answer || '';
              const userAnswer =
                userAnswerRaw.trim() !== '' ? JSON.parse(userAnswerRaw) : '';
              const isCorrect = answersTNTLN[question.id]?.result;
              const correctAnswer = question.correctAnswer || '';

              return (
                <View
                  key={question.id + 'TLN'}
                  style={{
                    backgroundColor: 'white',
                    padding: 12,
                    borderRadius: 10,
                    elevation: 2,
                    gap: 10,
                  }}
                >
                  {/* Header câu hỏi */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color:
                          isCorrect === true
                            ? 'green'
                            : isCorrect === false
                              ? 'red'
                              : 'orange',
                      }}
                    >
                      Câu {idx + 1}:
                    </Text>
                    {isCorrect === true && (
                      <Text style={{ color: 'green', fontSize: 18 }}>✓</Text>
                    )}
                  </View>

                  {/* Nội dung câu hỏi */}
                  <Text>{question.content}</Text>

                  {question.imageUrl && (
                    <Image
                      source={{ uri: question.imageUrl }}
                      style={{
                        width: '100%',
                        height: 180,
                        borderRadius: 8,
                        resizeMode: 'contain',
                      }}
                    />
                  )}

                  {/* Câu trả lời của bạn */}
                  <View
                    style={{
                      marginTop: 8,
                      padding: 10,
                      backgroundColor: '#f8fafc',
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: '#ccc',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#666',
                        fontWeight: '500',
                        marginBottom: 4,
                      }}
                    >
                      Câu trả lời của bạn:
                    </Text>
                    <Text style={{ color: '#333' }}>
                      {userAnswer !== '' ? userAnswer : 'Chưa trả lời.'}
                    </Text>
                  </View>

                  {/* Đáp án đúng */}
                  {correctAnswer !== '' && (
                    <View
                      style={{
                        marginTop: 8,
                        padding: 10,
                        backgroundColor: '#dcfce7',
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: '#c6f6d5',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'green',
                          fontWeight: '500',
                          marginBottom: 4,
                        }}
                      >
                        Đáp án đúng:
                      </Text>
                      <Text style={{ color: 'green', fontWeight: '600' }}>
                        {correctAnswer}
                      </Text>
                    </View>
                  )}

                  {/* Nút hiển thị/ẩn lời giải */}
                  <TouchableOpacity
                    onPress={() => toggleSolution(question.id)}
                    style={{
                      alignSelf: 'flex-start',
                      marginTop: 8,
                      backgroundColor: colors.primary,
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderRadius: 6,
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        fontWeight: '500',
                      }}
                    >
                      {shownSolutions[question.id]
                        ? 'Ẩn lời giải'
                        : 'Hiển thị lời giải'}
                    </Text>
                  </TouchableOpacity>

                  {/* Nội dung lời giải */}
                  {shownSolutions[question.id] &&
                    (question.solution ||
                    question.solutionImageUrl ||
                    question.solutionUrl ? (
                      <View
                        style={{
                          marginTop: 10,
                          padding: 12,
                          backgroundColor: '#e5e7eb',
                          borderRadius: 6,
                          gap: 8,
                        }}
                      >
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                          Lời giải:
                        </Text>

                        {question.solution && (
                          <Text style={{ whiteSpace: 'pre-line' }}>
                            {question.solution}
                          </Text>
                        )}

                        {question.solutionImageUrl && (
                          <Image
                            source={{ uri: question.solutionImageUrl }}
                            style={{
                              width: '100%',
                              height: 200,
                              resizeMode: 'contain',
                              borderRadius: 8,
                              borderWidth: 1,
                              borderColor: '#999',
                            }}
                          />
                        )}

                        {question.solutionUrl && (
                          <TouchableOpacity
                            onPress={() =>
                              Linking.openURL(question.solutionUrl)
                            }
                          >
                            <Text
                              style={{
                                color: '#3b82f6',
                                textDecorationLine: 'underline',
                              }}
                            >
                              Xem lời giải chi tiết tại đây
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : (
                      <View
                        style={{
                          marginTop: 10,
                          padding: 12,
                          backgroundColor: '#f3f4f6',
                          borderRadius: 6,
                        }}
                      >
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                          Lời giải:
                        </Text>
                        <Text>Không có lời giải cho câu hỏi này.</Text>
                      </View>
                    ))}
                </View>
              );
            })}
          </View>
        </View>

        <Button
          text="Trở về trang chủ"
          onPress={() => router.replace('/practice')}
          style={{ marginBottom: 20 }}
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
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Đẩy button sang phải
    paddingVertical: 20,
    marginHorizontal: 20,
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
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 8,
  },
  section: {
    gap: 4,
  },
  examName: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    color: colors.ink.darkest,
    fontSize: 20,
  },
});
