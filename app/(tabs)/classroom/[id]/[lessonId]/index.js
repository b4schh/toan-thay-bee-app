import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as Icons from '@expo/vector-icons';
import AppText from '../../../../../components/AppText';
import colors from '../../../../../constants/colors';
import YouTubePlayer from '../../../../../components/learning-item/YouTubePlayer';
import PdfWebView from '../../../../../components/PdfWebView';

const LessonDetail = () => {
  const { lessonId } = useLocalSearchParams();
  const { classDetail } = useSelector((state) => state.classes);
  
  const [openItems, setOpenItems] = useState([]); // ✅ Phải nằm trên cùng, trước khi dùng
  const [openSection, setOpenSection] = useState(null);
  const lesson = classDetail.lessons.find((lesson) => lesson.id == lessonId);

  // console.log("Chi tiet lop:", lesson.learningItems);

  const router = useRouter();
  const toggleItem = (id) => {
    setOpenItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const extractYouTubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\?&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <ScrollView
      style={styles.frameParent}
      contentContainerStyle={styles.frameContainerContent}
    >
      <View style={styles.chevronLeftParent}>
        <TouchableOpacity
          style={styles.chevronLeftLayout}
          onPress={() => {
            router.back();
          }}
        >
          <Icons.Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.bui1O}>{lesson.name}</Text>
      </View>
      <Text style={[styles.niDungBui, styles.lThuytTypo]}>
        Nội dung buổi học
      </Text>
      <View style={styles.frameGroup}>
        {lesson.learningItems.map((item, index) => {
          const isOpen = openItems.includes(item.id);

          return (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.chevronShadowBox}
                onPress={() => toggleItem(item.id)}
              >
                {isOpen ? (
                  <Icons.Feather name="chevron-down" size={16} color="black" />
                ) : (
                  <Icons.Feather name="chevron-right" size={16} color="black" />
                )}

                {item.typeOfLearningItem === 'DOC' ? (
                  <>
                    <Icons.Feather
                      name="book"
                      size={20}
                      color={colors.ink.darker}
                    />
                    <AppText style={styles.text}>Lý thuyết</AppText>
                  </>
                ) : item.typeOfLearningItem === 'VID' ? (
                  <>
                    <Icons.Feather
                      name="youtube"
                      size={20}
                      color={colors.ink.darker}
                    />
                    <AppText style={styles.text}>Video</AppText>
                  </>
                ) : (
                  <>
                    <Icons.Ionicons
                      name="document-text-outline"
                      size={20}
                      color={colors.ink.darker}
                    />
                    <AppText style={styles.text}>Bài tập</AppText>
                  </>
                )}
              </TouchableOpacity>

              {item.typeOfLearningItem === 'VID' && isOpen && item.url && (
                <View
                  style={{
                    marginTop: 12,
                    gap: 12,
                    padding: 12,
                    backgroundColor: '#fff',
                    borderRadius: 16,
                  }}
                >
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <YouTubePlayer videoId={extractYouTubeVideoId(item.url)} />
                </View>
              )}
              {item.typeOfLearningItem === 'BTVN' && isOpen && item.url && (
                <View
                  style={{
                    marginTop: 12,
                    gap: 12,
                    padding: 12,
                    backgroundColor: '#fff',
                    borderRadius: 16,
                  }}
                >
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <YouTubePlayer videoId={extractYouTubeVideoId(item.url)} />
                </View>
              )}
              {item.typeOfLearningItem === 'DOC' && isOpen && item.url && (
                <View
                  style={{
                    marginTop: 12,
                    gap: 12,
                    padding: 12,
                    backgroundColor: '#fff',
                    borderRadius: 16,
                  }}
                >
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <PdfWebView source={item.url}/>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default LessonDetail;

const styles = StyleSheet.create({
  frameContainerContent: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 16,
  },
  chevronLeftLayout: {
    height: 24,
    width: 24,
  },
  icon: {
    height: '100%',
    nodeWidth: 24,
    nodeHeight: 24,
    overflow: 'hidden',
    width: '100%',
  },
  bui1O: {
    color: '#090a0a',
    width: 280,
    textAlign: 'left',
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    alignItems: 'center',
  },
  lpI12a: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro-Bold',
    color: '#000',
    textAlign: 'center',
    lineHeight: 18,
  },
  mLpAbcxyz: {
    fontSize: 12,
    lineHeight: 12,
    fontFamily: 'BeVietnamPro-Regular',
    color: '#6c7072',
    textAlign: 'center',
  },
  moreVerticalIcon: {
    overflow: 'hidden',
  },
  chevronLeftParent: {
    flexDirection: 'row',
    gap: 10,
  },
  niDungBui: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#202325',
    alignSelf: 'stretch',
  },
  chevronDownIcon: {
    width: 12,
    height: 12,
    overflow: 'hidden',
  },
  bookIcon: {
    overflow: 'hidden',
  },
  lThuyt: {
    fontSize: 14,
    lineHeight: 14,
  },
  chevronShadowBox: {
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: 'rgba(20, 20, 20, 0.04)',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  frameGroup: {
    gap: 12,
    alignSelf: 'stretch',
  },
  frameParent: {
    backgroundColor: '#f7f9fa',
    flex: 1,
    maxWidth: '100%',
    width: '100%',
  },
  itemTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#202325',
    textAlign: 'center',
  },
});
