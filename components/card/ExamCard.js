// components/ExamCard.js
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AppText from '../AppText';
import colors from '../../constants/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const ExamCard = ({
  imageUrl,
  name,
  participantsCount,
  onPress,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.body}>
        <AppText
          style={styles.className}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {name}
        </AppText>
        <View style={styles.repsContainer}>
          <FontAwesomeIcon name="user" size={12} color={colors.sky.dark} />
          <AppText style={styles.repsText}>{`... lượt làm`}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExamCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.sky.white,
    width: 168,
    borderRadius: 12,
    padding: 10,
    gap: 8,
    // elevation: 3,
  },
  image: {
    width: '100%',
    resizeMode: 'stretch',
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    backgroundColor: '#EAF2FF',
  },
  body: {
    gap: 12,
  },
  className: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.ink.darkest,
    lineHeight: 18,
    maxWidth: '100%', // Đảm bảo không tràn khỏi card
    overflow: 'hidden', // Giúp cắt bỏ phần text thừa
  },
  repsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  repsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.sky.dark,
  },
});
