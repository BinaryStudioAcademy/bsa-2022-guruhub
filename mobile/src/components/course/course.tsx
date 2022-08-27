import React, { FC } from 'react';

import defaultCourseImage from '~/assets/images/default-course-image.png';
import { DataStatus } from '~/common/enums/enums';
import { CourseGetResponseDto } from '~/common/types/types';
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
import {
  useAppNavigate,
  useAppSelector,
  useEffect,
  useWindowDimensions,
} from '~/hooks/hooks';

import { styles } from './styles';

const Course: FC = () => {
  const navigation = useAppNavigate();
  const { width } = useWindowDimensions();
  const { course, dataStatus } = useAppSelector((state) => state.courses);
  const dataCourse = course as CourseGetResponseDto;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={navigation.goBack} />,
    });
  }, []);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.h1}>{dataCourse?.title}</Text>
        <Image
          style={styles.image}
          source={{ uri: course?.imageUrl ?? getImageUri(defaultCourseImage) }}
        />
        <Text style={styles.h2}>About this course</Text>
        {Boolean(course?.description) && (
          <Content html={dataCourse?.description} width={width} />
        )}
      </View>
    </ScrollView>
  );
};

export { Course };
