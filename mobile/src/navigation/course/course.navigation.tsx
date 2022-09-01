import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { CourseScreenName } from '~/common/enums/enums';
import { CourseNavigationParamList } from '~/common/types/types';
import { ChooseMentor } from '~/components/course/components/components';
import { Course as CourseScreen } from '~/components/course/course';

import { SCREEN_OPTIONS } from './common/constants';

const Tab = createMaterialTopTabNavigator<CourseNavigationParamList>();

const Course: FC = () => {
  return (
    <Tab.Navigator screenOptions={SCREEN_OPTIONS}>
      <Tab.Screen name={CourseScreenName.ABOUT} component={CourseScreen} />
      <Tab.Screen name={CourseScreenName.MY_MENTOR} component={ChooseMentor} />
    </Tab.Navigator>
  );
};

export { Course };
