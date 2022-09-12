import React, { FC } from 'react';

import { AppScreenName, DataStatus } from '~/common/enums/enums';
import { CourseUpdateCategoryRequestDto } from '~/common/types/types';
import { BackButton, Spinner, View } from '~/components/common/common';
import { EditCategoryDropdown } from '~/components/course/components/components';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useEffect,
} from '~/hooks/hooks';
import { categoryActions, coursesActions } from '~/store/actions';

import { styles } from './styles';

const EditCourseCategory: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const { course, dataStatus, categories, categoryDataStatus } = useAppSelector(
    ({ courses, categories }) => ({
      course: courses.course,
      dataStatus: courses.dataStatus,
      categoryDataStatus: categories.dataStatus,
      categories: categories.allCategories,
    }),
  );
  const courseCategoryId = course?.courseCategoryId;

  const navigateToCourseScreen = (): void => {
    navigation.navigate(AppScreenName.COURSE);
  };

  const handleSelectNewCategory = (
    payload: CourseUpdateCategoryRequestDto,
  ): void => {
    const { newCategoryId } = payload;

    if (course) {
      dispatch(
        coursesActions.updateCategory({
          courseId: course.id,
          newCategoryId,
        }),
      );
      navigateToCourseScreen();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={navigateToCourseScreen} />,
    });
    dispatch(categoryActions.getAllCategories());
  }, []);

  if (
    dataStatus === DataStatus.PENDING ||
    categoryDataStatus === DataStatus.PENDING
  ) {
    return <Spinner isOverflow />;
  }

  return (
    <View style={styles.container}>
      <EditCategoryDropdown
        categories={categories}
        defaultCategoryId={courseCategoryId}
        onSave={handleSelectNewCategory}
      />
    </View>
  );
};

export { EditCourseCategory };
