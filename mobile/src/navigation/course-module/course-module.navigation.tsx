import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { AppScreenName, CourseModuleScreenName } from '~/common/enums/enums';
import { CourseModuleNavigationParamList } from '~/common/types/types';
import { BackButton } from '~/components/common/common';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useEffect,
} from '~/hooks/hooks';
import { courseModulesActions, coursesActions } from '~/store/actions';

import {
  COUNT_TABS_FOR_HIDE,
  MODULE_TAB_ITEMS,
  SCREEN_OPTIONS,
} from './common/constants';

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

  const screensToRender = MODULE_TAB_ITEMS.filter(
    (screen) => showTask || screen.name !== CourseModuleScreenName.TASK,
  );
  const isTabsShown = screensToRender.length > COUNT_TABS_FOR_HIDE;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={(): void => handleGoBack()} />,
    });
  }, []);

  return (
    <Tab.Navigator screenOptions={SCREEN_OPTIONS}>
      {screensToRender.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{ tabBarStyle: { display: isTabsShown ? 'flex' : 'none' } }}
        />
      ))}
    </Tab.Navigator>
  );
};

export { CourseModule };
