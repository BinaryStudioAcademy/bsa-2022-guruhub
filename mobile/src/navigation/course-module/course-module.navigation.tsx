import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { MIN_SCREENS_COUNT_FOR_TABS } from '~/common/constants/constants';
import { CourseModuleScreenName } from '~/common/enums/enums';
import { CourseModuleNavigationParamList } from '~/common/types/types';
import { BackButton } from '~/components/common/common';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useEffect,
} from '~/hooks/hooks';
import { courseModulesActions, coursesActions } from '~/store/actions';

import { MODULE_TAB_ITEMS, SCREEN_OPTIONS } from './common/constants';

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
    navigation.goBack();
  };

  const screensToRender = MODULE_TAB_ITEMS.filter(
    (screen) => showTask || screen.name !== CourseModuleScreenName.TASK,
  );
  const isTabsShown = screensToRender.length > MIN_SCREENS_COUNT_FOR_TABS;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={handleGoBack} />,
    });
  }, []);

  return (
    <Tab.Navigator screenOptions={SCREEN_OPTIONS}>
      {screensToRender.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name as CourseModuleScreenName}
          component={screen.component}
          options={{ tabBarStyle: { display: isTabsShown ? 'flex' : 'none' } }}
        />
      ))}
    </Tab.Navigator>
  );
};

export { CourseModule };
