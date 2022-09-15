import React, { FC, ReactElement } from 'react';

import { AppScreenName, DataStatus, PermissionKey } from '~/common/enums/enums';
import {
  FlatList,
  Pressable,
  Spinner,
  Text,
  View,
} from '~/components/common/common';
import { checkHasPermission } from '~/helpers/helpers';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useCallback,
  useEffect,
  useFocusEffect,
  useWindowDimensions,
} from '~/hooks/hooks';
import { courseModulesActions, coursesActions } from '~/store/actions';

import { CourseContent } from './components/course-content/course-content';
import { Module } from './components/module/module';
import { styles } from './styles';

const Course: FC = () => {
  const navigation = useAppNavigate();
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();

  const {
    user,
    course,
    dataStatus,
    courseModules,
    modulesDataStatus,
    isMentor,
    tasks,
    tasksDataStatus,
    menteeId,
  } = useAppSelector(({ auth, courses, courseModules }) => ({
    user: auth.user,
    course: courses.course,
    mentors: courses.mentors,
    dataStatus: courses.dataStatus,
    courseModules: courseModules.courseModules,
    modulesDataStatus: courseModules.dataStatus,
    isMentor: courses.isMentor,
    tasks: courses.tasks,
    tasksDataStatus: courses.dataTasksStatus,
    menteeId: courses.menteeId,
  }));

  const courseIsLoading = dataStatus === DataStatus.PENDING;
  const moduleIsLoading = modulesDataStatus === DataStatus.PENDING;
  const taskIsLoading = tasksDataStatus === DataStatus.PENDING;

  const handleEditModeToggle = (): void => {
    navigation.navigate(AppScreenName.EDIT_COURSE);
  };

  const hasEditCategoryPermission = checkHasPermission({
    permissionKeys: [PermissionKey.MANAGE_CATEGORIES],
    userPermissions: user?.permissions ?? [],
  });

  useEffect(() => {
    if (course) {
      dispatch(coursesActions.checkIsMentor({ id: course.id }));
      dispatch(courseModulesActions.getCourseModules({ courseId: course.id }));
      dispatch(
        coursesActions.getMentorsByCourseId({
          courseId: course.id,
          filteringOpts: {
            mentorName: '',
          },
        }),
      );
    }
  }, [course]);

  useEffect(() => {
    if (course && menteeId) {
      dispatch(
        coursesActions.getTasksByCourseIdAndMenteeId({
          courseId: course.id,
          menteeId: menteeId,
        }),
      );
    }
  }, [course, menteeId]);

  useEffect(() => {
    if (user && course) {
      dispatch(coursesActions.updateVisibilityBecomeMentor(user.id));

      dispatch(
        coursesActions.getMenteesMentor({
          courseId: course.id,
          menteeId: user.id,
        }),
      );
    }
  }, [user, course]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(coursesActions.setBecomeMentorInvisible());
      };
    }, []),
  );

  const handleModulePress = (courseId: number, moduleId: number): void => {
    dispatch(courseModulesActions.getModuleById({ courseId, moduleId }));
    navigation.navigate(AppScreenName.COURSE_MODULE);
  };

  if (taskIsLoading || courseIsLoading) {
    return <Spinner isOverflow />;
  }

  if (!course) {
    return <Text>There is no course with provided id </Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={(): ReactElement => (
          <CourseContent
            width={width}
            course={course}
            hasEditCategoryPermission={hasEditCategoryPermission}
            onEditModeToggle={handleEditModeToggle}
          />
        )}
        data={courseModules}
        keyExtractor={({ id }): string => id.toString()}
        renderItem={({ item: module, index }): ReactElement => (
          <Pressable
            onPress={(): void => handleModulePress(module.courseId, module.id)}
            disabled={!user}
            style={Boolean(index) && styles.separator}
          >
            <Module
              index={index}
              title={module.title}
              description={module.description}
              isMentor={isMentor}
              moduleId={module.id}
              tasks={tasks}
            />
          </Pressable>
        )}
        ListEmptyComponent={(): ReactElement =>
          moduleIsLoading ? (
            <Spinner />
          ) : (
            <Text style={styles.noModules}>No modules found</Text>
          )
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export { Course };
