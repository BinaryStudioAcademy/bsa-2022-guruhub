import React, { FC } from 'react';

import defaultCourseImage from '~/assets/images/default-course-image.png';
import { AppScreenName, DataStatus, PermissionKey } from '~/common/enums/enums';
import {
  BackButton,
  Content,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  View,
} from '~/components/common/common';
import { checkHasPermission, getImageUri } from '~/helpers/helpers';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useEffect,
  useWindowDimensions,
} from '~/hooks/hooks';
import { courseModulesActions } from '~/store/actions';

import { Category } from './components/components';
import { CourseModules } from './components/course-modules/course-modules';
import { styles } from './styles';

const Course: FC = () => {
  const navigation = useAppNavigate();
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();

  const { user, course, dataStatus } = useAppSelector(({ auth, courses }) => ({
    user: auth.user,
    course: courses.course,
    dataStatus: courses.dataStatus,
  }));

  const currentCategory = course?.category;

  const handleEditModeToggle = (): void => {
    navigation.navigate(AppScreenName.EDIT_COURSE_CATEGORY);
  };

  const hasEditCategoryPermission = checkHasPermission({
    permissionKeys: [PermissionKey.MANAGE_CATEGORIES],
    userPermissions: user?.permissions ?? [],
  });

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={navigation.goBack} />,
      headerRight: () =>
        hasEditCategoryPermission && (
          <Pressable
            style={styles.editIconContainer}
            onPress={handleEditModeToggle}
          >
            <Icon width={25} height={25} name="edit" color="white" />
          </Pressable>
        ),
    });
  }, []);

  useEffect(() => {
    if (course) {
      dispatch(courseModulesActions.getCourseModules({ courseId: course.id }));
    }
  }, [course]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <ScrollView>
      {course && (
        <View style={styles.container}>
          <Text style={styles.h1}>{course?.title}</Text>
          <View style={styles.currentCategory}>
            <Category
              keyName={currentCategory?.key ?? 'unknown'}
              name={currentCategory?.name ?? 'Unknown'}
              isActive={false}
            />
          </View>

          <Image
            style={styles.image}
            source={{
              uri: course?.imageUrl ?? getImageUri(defaultCourseImage),
            }}
          />
          <Text style={styles.h2}>About this course</Text>
          {course.description && (
            <Content html={course.description} width={width} />
          )}
          <CourseModules />
        </View>
      )}
    </ScrollView>
  );
};

export { Course };
