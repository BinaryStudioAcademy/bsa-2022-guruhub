import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { MyCoursesScreenName } from '~/common/enums/enums';
import { MyCoursesNavigationParamList } from '~/common/types/types';
import { View } from '~/components/common/common';
import {
  CoursesAsMentor,
  CoursesAsStudent,
} from '~/components/my-courses/components/components';

import { SCREEN_OPTIONS } from './common/constants';
import { styles } from './styles';

const Tab = createMaterialTopTabNavigator<MyCoursesNavigationParamList>();

const MyCourses: FC = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={SCREEN_OPTIONS}>
        <Tab.Screen
          name={MyCoursesScreenName.STUDENT}
          component={CoursesAsStudent}
        />
        <Tab.Screen
          name={MyCoursesScreenName.MENTOR}
          component={CoursesAsMentor}
        />
      </Tab.Navigator>
    </View>
  );
};

export { MyCourses };
