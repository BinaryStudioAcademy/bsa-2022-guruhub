import React, { FC, ReactElement } from 'react';

import { CourseGetResponseDto } from '~/common/types/courses/courses';
import { Image, Pressable, Text, View } from '~/components/common/common';
import { VendorLabel } from '~/components/courses/components/course-card/components/components';

import { styles } from './styles';

type Props = {
  course: CourseGetResponseDto;
  onCoursePress?: () => void;
};

const CourseCard: FC<Props> = ({ course, onCoursePress }): ReactElement => {
  const { title, imageUrl, vendor } = course;
  const { name: vendorName } = vendor;

  return (
    <Pressable onPress={onCoursePress} style={styles.container}>
      {vendorName && <VendorLabel vendorName={vendorName} />}
      <View style={styles.imageContainer}>
        <Image style={styles.course_image} source={{ uri: imageUrl }} />
      </View>
      <View style={styles.inner_container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

export { CourseCard };
