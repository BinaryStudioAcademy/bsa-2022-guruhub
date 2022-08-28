import React, { FC } from 'react';

import { AppScreenName, DataStatus } from '~/common/enums/enums';
import {
  CategoryGetAllItemResponseDto,
  CourseGetResponseDto,
} from '~/common/types/types';
import {
  BackButton,
  Dropdown,
  Icon,
  Pressable,
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

import {
  DEFAUTL_UPDATE_COURSE_CATEGORY_PAYLOAD,
  DropDownPayload,
} from './common/common';
import { styles } from './styles';

const EditCourseCategory: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const { course, dataStatus, categories } = useAppSelector(
    (state) => state.courses,
  );

  const { control, handleSubmit, reset } = useAppForm<
    DropDownPayload | CategoryGetAllItemResponseDto
  >({
    defaultValues: DEFAUTL_UPDATE_COURSE_CATEGORY_PAYLOAD,

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
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={(): void => navigation.navigate(AppScreenName.COURSE)}
        />
      ),
      headerRight: () => (
        <Pressable
          style={styles.saveIconContainer}
          onPress={handleSubmit(handleSelectNewCategory)}
        >
          <Icon width={20} height={20} name="save" color="white" />
        </Pressable>
      ),
    });

    dispatch(coursesActions.getCategories());
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset(DEFAUTL_UPDATE_COURSE_CATEGORY_PAYLOAD);
      };
    }, []),
  );

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <View style={styles.container}>
      <Dropdown items={categories} control={control} name="newCategoryId" />
    </View>
  );
};

export { EditCourseCategory };
