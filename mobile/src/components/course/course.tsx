import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

import defaultCourseImage from '~/assets/images/default-course-image.png';
import { DataStatus } from '~/common/enums/enums';
import {
  Image,
  ScrollView,
  Spinner,
  Text,
  View,
} from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import { useAppSelector } from '~/hooks/hooks';

import { styles } from './styles';

const Course: FC = () => {
  const { course, dataStatus } = useAppSelector((state) => state.courses);
  const { width } = useWindowDimensions();

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
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
          contentWidth={width}
          source={{ html: course?.description }}
        />
      </View>
    </ScrollView>
  );
};

export { Course };
