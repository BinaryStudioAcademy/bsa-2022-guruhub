import React, { FC } from 'react';

import { DataStatus } from '~/common/enums/enums';
import { CourseUpdateCategoryRequestDto } from '~/common/types/types';
import { BackButton, Spinner, View } from '~/components/common/common';
import { EditCategory } from '~/components/course/components/components';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useEffect,
} from '~/hooks/hooks';
import { coursesActions, coursesManagementActions } from '~/store/actions';

import { styles } from './styles';

const EditCourse: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const { course, dataStatus, categories, categoryDataStatus } = useAppSelector(
    ({ courses, coursesManagement }) => ({
      course: courses.course,
      dataStatus: courses.dataStatus,
      categories: coursesManagement.categories,
      categoryDataStatus: coursesManagement.dataStatus,
    }),
  );
  const courseCategoryId = course?.courseCategoryId;

  const goBack = (): void => {
    navigation.goBack();
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
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={goBack} />,
    });
    dispatch(coursesManagementActions.getCategories());
  }, []);

  if (
    dataStatus === DataStatus.PENDING ||
    categoryDataStatus === DataStatus.PENDING
  ) {
    return <Spinner isOverflow />;
  }

  return (
    <View style={styles.container}>
      <EditCategory
        categories={categories}
        defaultCategoryId={courseCategoryId}
        onSave={handleSelectNewCategory}
      />
    </View>
  );
};

export { EditCourse };
