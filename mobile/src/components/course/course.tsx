import React, { FC } from 'react';

import defaultCourseImage from '~/assets/images/default-course-image.png';
import { DataStatus } from '~/common/enums/enums';
import {
  BackButton,
  Content,
  Image,
  ScrollView,
  Spinner,
  Text,
  View,
} from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import { useAppNavigate, useAppSelector, useEffect } from '~/hooks/hooks';

import { styles } from './styles';

const Course: FC = () => {
  const navigation = useAppNavigate();
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
        <Content html={course?.description} />
      </View>
    </ScrollView>
  );
};

export { Course };
