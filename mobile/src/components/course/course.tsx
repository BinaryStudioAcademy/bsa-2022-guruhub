import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

import defaultCourseImage from '~/assets/images/default-course-image.png';
import { DataStatus } from '~/common/enums/enums';
import {
  BackButton,
  Image,
  ScrollView,
  Spinner,
  Text,
  View,
} from '~/components/common/common';
import { getImageUri, sanitizeHTML } from '~/helpers/helpers';
import { useAppNavigate, useAppSelector, useEffect } from '~/hooks/hooks';

import { styles, tagsStyles } from './styles';

const Course: FC = () => {
  const navigation = useAppNavigate();
  const { width } = useWindowDimensions();
  const { course, dataStatus } = useAppSelector((state) => state.courses);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={navigation.goBack} />,
    });
  }, []);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  if (!course) {
    return <Text>There is no course with provided id</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.h1}>{course?.title}</Text>
        <Image
          style={styles.image}
          source={{ uri: course?.imageUrl ?? getImageUri(defaultCourseImage) }}
        />
        <Text style={styles.h2}>About this course</Text>
        <RenderHtml
          baseStyle={styles.text}
          tagsStyles={tagsStyles}
          contentWidth={width}
          source={{ html: sanitizeHTML(course?.description) }}
        />
      </View>
    </ScrollView>
  );
};

export { Course };
