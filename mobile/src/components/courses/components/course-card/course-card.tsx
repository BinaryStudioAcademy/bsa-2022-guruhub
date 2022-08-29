import React, { FC, ReactElement } from 'react';

import defaultCourseImage from '~/assets/images/default-course-image.png';
import {
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
} from '~/common/types/courses/courses';
import { Image, Pressable, Text, View } from '~/components/common/common';
import { VendorLabel } from '~/components/courses/components/course-card/components/components';
import { getImageUri } from '~/helpers/helpers';

import { styles } from './styles';

type Props = {
  course: CourseGetResponseDto;
  onCoursePress: (id: CourseGetRequestParamsDto) => void;
};

const CourseCard: FC<Props> = ({ course, onCoursePress }): ReactElement => {
  const { id, title, imageUrl, vendor } = course;
  const { key: vendorKey } = vendor;

  const handlePostExpand = (): void => onCoursePress({ id });

  return (
    <Pressable onPress={handlePostExpand} style={styles.container}>
      {vendorKey && <VendorLabel vendorKey={vendorKey} />}
      <View style={styles.imageContainer}>
        <Image
          style={styles.courseImage}
          source={{ uri: imageUrl ?? getImageUri(defaultCourseImage) }}
        />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

export { CourseCard };
