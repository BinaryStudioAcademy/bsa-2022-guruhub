import React, { FC } from 'react';

import { AppScreenName, DataStatus } from '~/common/enums/enums';
import { CourseUpdateCategoryRequestDto } from '~/common/types/types';
import {
  BackButton,
  Button,
  Dropdown,
  Spinner,
  View,
} from '~/components/common/common';
import {
  useAppDispatch,
  useAppForm,
  useAppNavigate,
  useAppSelector,
  useEffect,
} from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';
import { courseUpdateCategory as courseUpdateCategoryValidationSchema } from '~/validation-schemas/validation-schemas';

import { styles } from './styles';

const EditCourseCategory: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const { course, dataStatus, categories } = useAppSelector(
    ({ courses, categories }) => ({
      course: courses.course,
      dataStatus: courses.dataStatus,
      categories: categories.categories,
    }),
  );
  const courseCategoryId = course?.courseCategoryId;
  const categoriesData = categories.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  const { control, handleSubmit, reset, errors } =
    useAppForm<CourseUpdateCategoryRequestDto>({
      defaultValues: {},
      validationSchema: courseUpdateCategoryValidationSchema,
    });

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
  }, []);

  useEffect(() => {
    if (course) {
      reset({
        newCategoryId: course.courseCategoryId,
      });
    }
  }, [courseCategoryId]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <View style={styles.container}>
      <Dropdown
        items={categoriesData}
        control={control}
        name="newCategoryId"
        errors={errors}
        selectingObjectName="category"
      />
      <View style={styles.saveButtonContainer}>
        <Button label="Save" onPress={handleSubmit(handleSelectNewCategory)} />
      </View>
    </View>
  );
};

export { EditCourseCategory };
