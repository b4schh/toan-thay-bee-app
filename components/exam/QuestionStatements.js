import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../AppText';
import Button from '../button/Button';
import colors from 'constants/colors';
import MyMathText from '@components/latex/MyMathText';

export default function QuestionStatements({
  type,
  question,
  answerTN,
  answerDS,
  onSelectAnswerTN,
  onSelectAnswerDS,
  onSelectAnswerTLN,
  tlnInput,
  setTlnInput,
}) {
  if (type === 'TN') {
    return (
      <View>
        {question?.statements?.map((statement) => (
          <TouchableOpacity
            key={statement.id}
            style={styles.optionContainer}
            onPress={() => onSelectAnswerTN(question.id, statement.id, type)}
          >
            <View style={styles.radioCircle}>
              {answerTN?.find((answer) => answer.questionId === question.id)
                ?.answerContent == statement.id && (
                <View style={styles.selectedCircle} />
              )}
            </View>

            <MyMathText statement={statement.content} />

            {/* <AppText style={styles.statementText}>{statement.content}</AppText> */}
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (type === 'DS') {
    return (
      <View style={styles.dsContainer}>
        {question?.statements?.map((statement, index) => {
          const currentAnswer =
            answerDS[question.id]?.find(
              (a) => a.statementId === statement.id,
            ) || {};

          return (
            <View key={statement.id} style={styles.trueFalseContainer}>
              <AppText style={styles.statementText}>
                {`${index + 1}. ${(
                  <MyMathText statement={statement.content} />
                )}`}
              </AppText>
              <View style={styles.trueFalseButtons}>
                <Button
                  text="Đúng"
                  textStyle={[
                    currentAnswer.answer !== true && styles.buttonText,
                  ]}
                  style={[
                    styles.trueFalseButton,
                    currentAnswer.answer === true && styles.selectedButton,
                  ]}
                  onPress={() =>
                    onSelectAnswerDS(question.id, statement.id, true)
                  }
                />
                <Button
                  text="Sai"
                  textStyle={[
                    currentAnswer.answer !== false && styles.buttonText,
                  ]}
                  style={[
                    styles.trueFalseButton,
                    currentAnswer.answer === false && styles.selectedButton,
                  ]}
                  onPress={() =>
                    onSelectAnswerDS(question.id, statement.id, false)
                  }
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  if (type === 'TLN') {
    return (
      <TextInput
        style={styles.input}
        placeholder="Nhập đáp án"
        value={tlnInput}
        onChangeText={(text) => {
          setTlnInput(text); // cập nhật state
        }}
        onBlur={() => {
          onSelectAnswerTLN(question.id, tlnInput, type);
        }}
      />
    );
  }

  return null;
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dsContainer: {
    gap: 12,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  dsContainer: {
    gap: 12,
  },
  trueFalseContainer: {
    gap: 10,
  },
  statementText: {
    fontSize: 18,
    color: colors.ink.darker,
  },
  trueFalseButtons: {
    flexDirection: 'row',
  },
  trueFalseButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.ink.darker,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
});
