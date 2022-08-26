import React, { FC, ReactElement } from 'react';

import defaultCourseImage from '~/assets/images/default-course-image.png';
import { AppScreenName } from '~/common/enums/enums';
import { CourseGetResponseDto } from '~/common/types/courses/courses';
import { Image, Pressable, Text, View } from '~/components/common/common';
import { VendorLabel } from '~/components/courses/components/course-card/components/components';
import { getImageUri } from '~/helpers/helpers';
import { useAppDispatch, useAppNavigate } from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';

import { styles } from './styles';

type Props = {
  course: CourseGetResponseDto;
};

const CourseCard: FC<Props> = ({ course }): ReactElement => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();
  const { id, title, imageUrl, vendor } = course;
  const { key: vendorKey } = vendor;

  const onCoursePress = (): void => {
    dispatch(coursesActions.getCourse({ id }));
    navigation.navigate(AppScreenName.COURSE);
  };

  return (
    <Pressable onPress={onCoursePress} style={styles.container}>
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
