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

const EditCourse: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const {
    courseCategoryId,
    courseId,
    dataStatus,
    allCategories,
    categoryDataStatus,
  } = useAppSelector(({ courses, categories }) => ({
    courseId: courses.course?.id,
    courseCategoryId: courses.course?.courseCategoryId,
    dataStatus: courses.dataStatus,
    categoryDataStatus: categories.dataStatus,
    allCategories: categories.allCategories,
  }));

  const navigateToCourseManagement = (): void => {
    navigation.navigate(AppScreenName.COURSE_MANAGEMENT);
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={navigateToCourseManagement} />,
    });
    dispatch(categoryActions.getAllCategories());
  }, []);

  const handleSelectNewCategory = (
    payload: CourseUpdateCategoryRequestDto,
  ): void => {
    const { newCategoryId } = payload;

    if (courseId) {
      dispatch(
        coursesActions.updateCategory({
          courseId,
          newCategoryId,
        }),
      );
    }
  };

  if (
    dataStatus === DataStatus.PENDING ||
    categoryDataStatus === DataStatus.PENDING
  ) {
    return <Spinner isOverflow />;
  }

  return (
    <View style={styles.container}>
      <EditCategoryDropdown
        categories={allCategories}
        defaultCategoryId={courseCategoryId}
        onSave={handleSelectNewCategory}
      />
    </View>
  );
};

export { EditCourse };
