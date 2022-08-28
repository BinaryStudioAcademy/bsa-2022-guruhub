import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

import defaultCourseImage from '~/assets/images/default-course-image.png';
import { DataStatus, PermissionKey } from '~/common/enums/enums';
import {
  CategoryGetAllItemResponseDto,
  CourseGetResponseDto,
  CourseUpdateCategoryRequestDto,
} from '~/common/types/types';
import {
  BackButton,
  Dropdown,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  View,
} from '~/components/common/common';
import {
  checkHasPermission,
  getImageUri,
  sanitizeHTML,
} from '~/helpers/helpers';
import {
  useAppDispatch,
  useAppForm,
  useAppNavigate,
  useAppSelector,
  useCallback,
  useEffect,
  useFocusEffect,
  useState,
} from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';
import { courseUpdateCategory as courseUpdateCategoryValidationSchema } from '~/validation-schemas/validation-schemas';

import { getDefaultUpdateCourseCategoryPayload } from './common';
import { Category } from './components/components';
import { styles, tagsStyles } from './styles';

const Course: FC = () => {
  const [editMode, setEditMode] = useState(false);
  const navigation = useAppNavigate();
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const { course, dataStatus, categories } = useAppSelector(
    (state) => state.courses,
  );
  const currentCategory = course?.category;

  const handlePressEditIcon = (): void => {
    setEditMode((prev) => !prev);
  };

  const { control, handleSubmit, reset } = useAppForm<
    CourseUpdateCategoryRequestDto | CategoryGetAllItemResponseDto
  >({
    defaultValues: getDefaultUpdateCourseCategoryPayload(
      currentCategory?.id ?? 0,
    ),
    validationSchema: courseUpdateCategoryValidationSchema,
  });

  const hasEditCategoryPermission = checkHasPermission({
    permissionKeys: [PermissionKey.MANAGE_CATEGORIES],
    userPermissions: user?.permissions ?? [],
  });

  const handleSelectNewCategory = (payload: number): void => {
    // const { newCategoryId } = payload;

    dispatch(
      coursesActions.updateCategory({
        courseId: (course as CourseGetResponseDto).id,
        newCategoryId: payload,
      }),
    );

    handlePressEditIcon();
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={navigation.goBack} />,
      headerRight: () =>
        hasEditCategoryPermission && (
          <Pressable
            style={styles.editIconContainer}
            onPress={handlePressEditIcon}
          >
            <Icon width={25} height={25} name="edit" color={'white'} />
          </Pressable>
        ),
    });

    dispatch(coursesActions.getCategories());
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setEditMode(false);
        reset({ newCategoryId: 0 });
      };
    }, []),
  );

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  if (!course) {
    return <Text>There is no course with provided id</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.h1}>{course?.title}</Text>

        <View style={styles.dropdownContainer}>
          {editMode ? (
            <Dropdown
              items={categories}
              onSelectItem={(id): Promise<void> =>
                handleSubmit(() => handleSelectNewCategory(id))()
              }
              control={control}
              name="newCategoryId"
            />
          ) : (
            <Category
              keyName={currentCategory?.key ?? 'unknown'}
              name={currentCategory?.name ?? 'Unknown'}
            />
          )}
        </View>
        <Image
          style={styles.image}
          source={{ uri: course?.imageUrl ?? getImageUri(defaultCourseImage) }}
        />
        <Text style={styles.h2}>About this course</Text>
        <RenderHtml
          baseStyle={styles.text}
          tagsStyles={tagsStyles}
          contentWidth={width}
          source={{ html: sanitizeHTML(course?.description) }}
        />
      </View>
    </ScrollView>
  );
};

export { Course };
