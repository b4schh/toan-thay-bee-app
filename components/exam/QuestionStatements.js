import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../AppText';

export default function QuestionStatements({
  type,
  question,
  answers,
  onSelectAnswerTN,
  onSelectAnswerDS,
  onSelectAnswerTLN,
  tlnInput,
  setTlnInput,
}) {
  if (type === 'TN') {
    return (
      <View>
        {question.statements.map((statement) => (
          <TouchableOpacity
            key={statement.id}
            style={styles.optionContainer}
            onPress={() => onSelectAnswerTN(question.id, statement.id, type)}
          >
            <View style={styles.radioCircle}>
              {answers?.find((answer) => answer.questionId === question.id)
                ?.answerContent == statement.id && (
                <View style={styles.selectedCircle} />
              )}
            </View>
            <AppText style={styles.optionText}>{statement.content}</AppText>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (type === 'DS') {
    return (
      <View>
        {question.statements.map((statement, index) => (
          <View key={statement.id}>
            <AppText>{`${index + 1}. ${statement.content}`}</AppText>
            <View>
              <TouchableOpacity onPress={() => onSelectAnswerDS(question.id, statement.id, true)}>
                <AppText>Đúng</AppText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onSelectAnswerDS(question.id, statement.id, false)}>
                <AppText>Sai</AppText>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    );
  }

  if (type === 'TLN') {
    return (
      <TextInput
        style={styles.input}
        placeholder="Nhập đáp án"
        value={tlnInput}
        onChangeText={setTlnInput}
        onBlur={() => onSelectAnswerTLN(question.id, tlnInput, type)}
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
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
});