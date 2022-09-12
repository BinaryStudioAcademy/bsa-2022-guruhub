import React, { FC } from 'react';

import { AppScreenName, DataStatus } from '~/common/enums/enums';
import { CourseUpdateCategoryRequestDto } from '~/common/types/types';
import { BackButton, Spinner, View } from '~/components/common/common';
import { EditCategory } from '~/components/course/components/components';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useCallback,
  useEffect,
  useFocusEffect,
} from '~/hooks/hooks';
import {
  categoryActions,
  coursesActions,
  coursesManagementActions,
} from '~/store/actions';

import { styles } from './styles';

const EditCourse: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const {
    course,
    dataStatus,
    categories,
    categoryDataStatus,
    isFromCoursesManagement,
  } = useAppSelector(({ courses, categories, coursesManagement }) => ({
    course: courses.course,
    dataStatus: courses.dataStatus,
    categoryDataStatus: categories.dataStatus,
    categories: categories.allCategories,
    isFromCoursesManagement: coursesManagement.navigateFromCoursesManagement,
  }));
  const courseCategoryId = course?.courseCategoryId;

  const toScreen = isFromCoursesManagement
    ? AppScreenName.COURSE_MANAGEMENT
    : AppScreenName.COURSE;

  const goBack = (): void => {
    navigation.navigate(toScreen);
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
      goBack();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={goBack} />,
    });
    dispatch(categoryActions.getAllCategories());
  }, [isFromCoursesManagement]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(coursesManagementActions.unsetNavigateFromCoursesManagement());
      };
    }, []),
  );

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
