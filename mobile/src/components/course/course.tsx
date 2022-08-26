import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

import defaultCourseImage from '~/assets/images/default-course-image.png';
import { DataStatus, PermissionKey } from '~/common/enums/enums';
import { CategoryGetAllItemResponseDto } from '~/common/types/types';
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
  useAppNavigate,
  useAppSelector,
  useCallback,
  useEffect,
  useFocusEffect,
  useState,
} from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';

import { Category } from './components/components';
import { styles, tagsStyles } from './styles';

const Course: FC = () => {
  const navigation = useAppNavigate();
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { course, dataStatus, categories } = useAppSelector(
    (state) => state.courses,
  );
  const currentCategory = course?.category;

  const [editMode, setEditMode] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [currentDropdownValue, setCurrentDropdownValue] = useState(null);
  const [categoryItems, setCategoryItems] = useState<
    CategoryGetAllItemResponseDto[]
  >([]);

  const handlePressEditIcon = (): void => {
    setEditMode((prev) => !prev);
  };

  const hasEditCategoryPermission = checkHasPermission({
    permissionKeys: [PermissionKey.MANAGE_CATEGORIES],
    userPermissions: user?.permissions ?? [],
  });

  const handleSelectNewCategory = (catId: string | null): void => {
    if (catId && course?.id) {
      const payload = {
        courseId: course.id,
        newCategoryId: +catId,
      };

      dispatch(coursesActions.updateCategory(payload));
      handlePressEditIcon();
    } else return;
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

  useEffect(() => {
    setCategoryItems(categories);
  }, [categories]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setEditMode(false);
        setCurrentDropdownValue(null);
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
          {!editMode && (
            <Category
              keyName={currentCategory?.key ?? 'unknown'}
              name={currentCategory?.name ?? 'Unknown'}
            />
          )}
          {editMode && (
            <Dropdown
              open={openDropdown}
              setOpen={setOpenDropdown}
              value={currentDropdownValue}
              setValue={setCurrentDropdownValue}
              items={categoryItems}
              setItems={setCategoryItems}
              onChangeValue={handleSelectNewCategory}
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
