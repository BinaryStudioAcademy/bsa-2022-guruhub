import React, { FC } from 'react';

import { AppScreenName, DataStatus } from '~/common/enums/enums';
import {
  CategoryGetAllItemResponseDto,
  CourseGetResponseDto,
} from '~/common/types/types';
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
  useCallback,
  useEffect,
  useFocusEffect,
} from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';
import { courseUpdateCategory as courseUpdateCategoryValidationSchema } from '~/validation-schemas/validation-schemas';

import { DropDownPayload } from './common/common';
import { getDefaultValueforDropDown } from './helpers/get-categories-options-helper/helpers';
import { styles } from './styles';

const EditCourseCategory: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const { course, dataStatus, categories } = useAppSelector(
    (state) => state.courses,
  );
  const currentCategory = course?.courseCategoryId;

  const { control, handleSubmit, reset, errors } = useAppForm<
    DropDownPayload | CategoryGetAllItemResponseDto
  >({
    defaultValues: getDefaultValueforDropDown(currentCategory),
    validationSchema: courseUpdateCategoryValidationSchema,
  });

  const handleSelectNewCategory = (
    payload: DropDownPayload | CategoryGetAllItemResponseDto,
  ): void => {
    const newCategoryId = (payload as DropDownPayload).newCategoryId;

    if (newCategoryId) {
      dispatch(
        coursesActions.updateCategory({
          courseId: (course as CourseGetResponseDto).id,
          newCategoryId,
        }),
      );
      navigation.navigate(AppScreenName.COURSE);
    }
  };

  useEffect(() => {
    dispatch(coursesActions.getCategories());
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={(): void => navigation.navigate(AppScreenName.COURSE)}
        />
      ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      reset(getDefaultValueforDropDown(currentCategory));
    }, [currentCategory]),
  );

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <View style={styles.container}>
      <Dropdown
        items={categories}
        control={control}
        name="newCategoryId"
        errors={errors}
      />
      <View style={styles.saveButtonContainer}>
        <Button label="Save" onPress={handleSubmit(handleSelectNewCategory)} />
      </View>
    </View>
  );
};

export { EditCourseCategory };
