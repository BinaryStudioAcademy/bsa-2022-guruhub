import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { MyCoursesScreenName } from '~/common/enums/enums';
import { MyCoursesNavigationParamList } from '~/common/types/types';
import { View } from '~/components/common/common';
import {
  CoursesAsMentor,
  CoursesAsStudent,
} from '~/components/my-courses/components/components';
import { useAppNavigate, useCallback, useFocusEffect } from '~/hooks/hooks';

import { TAB_OPTIONS } from './common/constants/constants';
import { styles } from './styles';

const Tab = createMaterialTopTabNavigator<MyCoursesNavigationParamList>();

const MyCoursesTabs: FC = () => {
  const navigation = useAppNavigate();

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        headerShown: true,
      });
    }, []),
  );

  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={TAB_OPTIONS}>
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

export { MyCoursesTabs };
