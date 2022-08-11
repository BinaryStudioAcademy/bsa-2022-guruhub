import React, { FC, ReactElement } from 'react';
import { Image, Pressable, View } from 'react-native';

import { CoursesGetAllItemResponseDto } from '~/common/types/courses/courses';

import { Text } from '../../../common/common';
import { BestsellerLabel } from '../bestseller-label/bestseller-label';
import { DifficultyLabel } from '../difficulty-label/difficulty-label';
import { VendorLabel } from '../vendor-label/vendor-label';
import { styles } from './styles';

type Props = {
  course: CoursesGetAllItemResponseDto;
  onCoursePress?: () => void;
};

const CourseCard: FC<Props> = ({ course, onCoursePress }): ReactElement => {
  const {
    title,
    vendor_name,
    difficulty,
    author_name,
    is_bestseller,
    price,
    course_image,
  } = course;

  return (
    <Pressable onPress={onCoursePress} style={styles.container}>
      {vendor_name && <VendorLabel vendor_name={vendor_name} />}
      <View style={styles.imageContainer}>
        <Image style={styles.course_image} source={{ uri: course_image }} />
        <DifficultyLabel difficulty={difficulty} />
      </View>
      <View style={styles.inner_container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.author_container}>
          <View style={styles.avatar_container}></View>
          <Text style={styles.author_name}>{author_name}</Text>
        </View>

        <View style={styles.footer}>
          {is_bestseller ? (
            <BestsellerLabel />
          ) : (
            <View style={styles.footer_bestseller}></View>
          )}

          <Text style={styles.footer_price}>{`$${price}`}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export { CourseCard };
