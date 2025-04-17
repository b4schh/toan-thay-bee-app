import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from '../AppText';
import colors from '../../constants/colors';
import { useRouter } from 'expo-router';

const ArticleCard = ({ article, onPress }) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress(article);
    } else if (article.id) {
      router.push(`/article/${article.id}`);
    }
  };

  // Format date to display
  const formatDate = (dateString) => {
    if (!dateString) return 'Không có ngày';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {article.imageUrl && (
        <Image source={{ uri: article.imageUrl }} style={styles.image} />
      )}
      <View style={styles.content}>
        <AppText style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {article.title || 'Không có tiêu đề'}
        </AppText>
        
        <AppText style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {article.description || 'Không có mô tả'}
        </AppText>
        
        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <Feather name="calendar" size={14} color={colors.ink.light} />
            <AppText style={styles.date}>{formatDate(article.createdAt)}</AppText>
          </View>
          
          <View style={styles.authorContainer}>
            <Feather name="user" size={14} color={colors.ink.light} />
            <AppText style={styles.author}>{article.author || 'Không có tác giả'}</AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.sky.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    // elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.ink.darkest,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.ink.darker,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.ink.light,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  author: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.ink.light,
  },
});

export default ArticleCard;