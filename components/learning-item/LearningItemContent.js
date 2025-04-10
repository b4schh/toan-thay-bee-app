import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import YouTubePlayer from '../learning-item/YouTubePlayer';
import PdfWebView from '../pdf-viewer/PdfWebView';
import Button from '../button/Button';
import AppText from '../AppText';
import colors from 'constants/colors';
import { markLearningItem } from '../../features/class/classSlice';

export default function LearningItemContent({ item, router }) {
  const dispatch = useDispatch();

  // Check if studyStatuses exists and has at least one item
  const hasStatus = item.studyStatuses && item.studyStatuses.length > 0;
  const isDone = hasStatus ? item.studyStatuses[0].isDone : false;
  const studyTime = hasStatus ? item.studyStatuses[0].studyTime : 0;

  const handleMarkLearningItem = () => {
    dispatch(markLearningItem({ learningItemId: item.id }));
  };

  return (
    <View style={styles.content}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.name}</Text>
      </View>

      {item.typeOfLearningItem === 'VID' && item.url && (
        <YouTubePlayer videoId={extractYouTubeVideoId(item.url)} />
      )}
      {item.typeOfLearningItem === 'BTVN' && item.url && (
        <Button
          text="Làm bài"
          onPress={() => router.push(`practice/${item.url}`)}
        />
      )}
      {item.typeOfLearningItem === 'DOC' && item.url && (
        <PdfWebView source={item.url} />
      )}

      <Button
        text={isDone ? "Đánh dấu chưa hoàn thành" : "Đánh dấu đã hoàn thành"}
        icon={isDone ? "x-circle" : "check-circle"}
        iconLibrary="Feather"
        style={{
          marginTop: 12,
          backgroundColor: isDone ? colors.warning : colors.success,
        }}
        onPress={handleMarkLearningItem}
      />
    </View>
  );
}

const extractYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\?&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const styles = StyleSheet.create({
  content: {
    marginTop: 12,
    gap: 12,
    padding: 12,
    backgroundColor: colors.sky.white,
    borderRadius: 16,
    elevation: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.ink.darker,
    flex: 1,
  },
  statusContainer: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studyTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yellowIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.warning,
    marginRight: 4,
  },
  studyTimeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.ink.dark,
  },
});
