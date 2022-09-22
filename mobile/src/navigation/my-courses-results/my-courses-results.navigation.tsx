import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { MyCoursesResultsScreenName } from '~/common/enums/enums';
import { MyCoursesResultsNavigationParamList } from '~/common/types/types';
import { View } from '~/components/common/common';
import {
  CoursesAsMentor,
  CoursesAsStudent,
} from '~/components/my-courses/components/components';
import { useAppNavigate, useCallback, useFocusEffect } from '~/hooks/hooks';

import { SCREEN_OPTIONS } from './common/constants/constants';
import { styles } from './styles';

const Tab =
  createMaterialTopTabNavigator<MyCoursesResultsNavigationParamList>();

const MyCourses: FC = () => {
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
      <Tab.Navigator screenOptions={SCREEN_OPTIONS}>
        <Tab.Screen
          name={MyCoursesResultsScreenName.STUDENT}
          component={CoursesAsStudent}
        />
        <Tab.Screen
          name={MyCoursesResultsScreenName.MENTOR}
          component={CoursesAsMentor}
        />
      </Tab.Navigator>
    </View>
  );
};

export { MyCourses };
