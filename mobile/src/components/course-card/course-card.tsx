import React, { FC, ReactElement } from 'react';

import defaultCourseImage from '~/assets/images/default-course-image.png';
import {
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
} from '~/common/types/courses/courses';
import { Image, Pressable, Text, View } from '~/components/common/common';
import {
  CategoryLabel,
  VendorLabel,
} from '~/components/course-card/components/components';
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

  const coursePriceCurrency = course.category?.price ? '$' : '';
  const coursePriceAmount = course.category?.price.price ?? '';
  const coursePrice = `${coursePriceCurrency}${coursePriceAmount}/h`;

  return (
    <Pressable onPress={handlePostExpand} style={styles.container}>
      {vendorKey && <VendorLabel vendorKey={vendorKey} />}
      <View style={styles.imageContainer}>
        <Image
          style={styles.courseImage}
          source={{ uri: imageUrl ?? getImageUri(defaultCourseImage) }}
        />
        {course.category && (
          <CategoryLabel
            name={course.category.name}
            keyName={course.category.key}
          />
        )}
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.priceWrapper}>
        <Text style={styles.price}>{coursePrice}</Text>
      </View>
    </Pressable>
  );
};

export { CourseCard };
