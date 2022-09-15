import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { AppScreenName, CourseModuleScreenName } from '~/common/enums/enums';
import { CourseModuleNavigationParamList } from '~/common/types/types';
import { BackButton } from '~/components/common/common';
import { About, Task } from '~/components/course-module/components/components';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useEffect,
} from '~/hooks/hooks';
import { courseModulesActions, coursesActions } from '~/store/actions';

import { SCREEN_OPTIONS } from './common/constants';

const Tab = createMaterialTopTabNavigator<CourseModuleNavigationParamList>();

const CourseModule: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const { isCourseMentor, isMenteeMentor, course, menteeId } = useAppSelector(
    ({ courses, courseModules }) => ({
      course: courses.course,
      isCourseMentor: courses.isMentor,
      isMenteeMentor: courseModules.isMentor,
      menteeId: courses.menteeId,
    }),
  );

  const showTask = !isCourseMentor || isMenteeMentor;

  const handleGoBack = (): void => {
    if (course && menteeId) {
      dispatch(
        coursesActions.getTasksByCourseIdAndMenteeId({
          courseId: course.id,
          menteeId,
        }),
      );
      dispatch(courseModulesActions.getCourseModules({ courseId: course.id }));
    }
    navigation.navigate(AppScreenName.COURSE);
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={(): void => handleGoBack()} />,
    });
  }, []);

  return (
    <Tab.Navigator screenOptions={SCREEN_OPTIONS}>
      <Tab.Screen name={CourseModuleScreenName.ABOUT} component={About} />
      {showTask && (
        <Tab.Screen name={CourseModuleScreenName.TASK} component={Task} />
      )}
    </Tab.Navigator>
  );
};

export { CourseModule };
