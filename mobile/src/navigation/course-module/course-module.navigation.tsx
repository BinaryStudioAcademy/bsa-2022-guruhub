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
import { coursesActions } from '~/store/actions';

import { SCREEN_OPTIONS } from './common/constants';

const Tab = createMaterialTopTabNavigator<CourseModuleNavigationParamList>();

const CourseModule: FC = () => {
  const { course, menteeId } = useAppSelector(({ courses }) => ({
    course: courses.course,
    menteeId: courses.menteeId,
  }));
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const handleBackToCourse = (): void => {
    if (course && menteeId) {
      dispatch(
        coursesActions.getTasksByCourseIdAndMenteeId({
          courseId: course.id,
          menteeId: menteeId,
        }),
      );
    }

    navigation.navigate(AppScreenName.COURSE);
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton onPress={(): void => handleBackToCourse()} />
      ),
    });
  }, []);

  return (
    <Tab.Navigator screenOptions={SCREEN_OPTIONS}>
      <Tab.Screen name={CourseModuleScreenName.ABOUT} component={About} />
      <Tab.Screen name={CourseModuleScreenName.TASK} component={Task} />
    </Tab.Navigator>
  );
};

export { CourseModule };
