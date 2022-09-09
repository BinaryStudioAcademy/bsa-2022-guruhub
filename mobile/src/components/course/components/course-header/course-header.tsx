import React, { FC } from 'react';

import defaultCourseImage from '~/assets/images/default-course-image.png';
import { CourseGetResponseDto } from '~/common/types/types';
import {
  Category,
  Icon,
  Image,
  Pressable,
  Text,
  View,
} from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import { useCallback, useFocusEffect, useState } from '~/hooks/hooks';

import { CourseDescription } from '../components';
import { styles } from './styles';

type Props = {
  width: number;
  course: CourseGetResponseDto;
  hasEditCategoryPermission: boolean;
  onEditModeToggle: () => void;
};

const CourseHeader: FC<Props> = ({
  width,
  course,
  hasEditCategoryPermission,
  onEditModeToggle,
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const currentCategory = course?.category;

  const handleExpandedToggle = (): void => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsDescriptionExpanded(false);
      };
    }, []),
  );

  return (
    <View>
      <Text style={styles.h1}>{course.title}</Text>
      <View style={styles.currentCategory}>
        <View style={styles.categoryWrapper}>
          <Category
            keyName={currentCategory?.key ?? 'unknown'}
            name={currentCategory?.name ?? 'Unknown'}
          />
        </View>
        {hasEditCategoryPermission && (
          <Pressable
            style={styles.editIconContainer}
            onPress={onEditModeToggle}
          >
            <Icon width={25} height={25} name="edit" color="white" />
          </Pressable>
        )}
      </View>
      <Image
        style={styles.image}
        source={{
          uri: course?.imageUrl ?? getImageUri(defaultCourseImage),
        }}
      />
      <Text style={styles.h2}>About this course</Text>
      {Boolean(course.description) && (
        <CourseDescription
          description={course.description}
          isExpanded={isDescriptionExpanded}
          handleExpandedToggle={handleExpandedToggle}
          width={width}
        />
      )}
      <Text style={styles.title}>Course Content</Text>
    </View>
  );
};

export { CourseHeader };
