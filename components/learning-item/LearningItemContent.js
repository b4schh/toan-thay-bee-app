import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import YouTubePlayer from '../learning-item/YouTubePlayer';
import PdfWebView from '../pdf-viewer/PdfWebView';
import Button from '../button/Button';
import colors from 'constants/colors';

export default function LearningItemContent({ item, router }) {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>{item.name}</Text>
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
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.ink.darker,
    textAlign: 'center',
  },
});
