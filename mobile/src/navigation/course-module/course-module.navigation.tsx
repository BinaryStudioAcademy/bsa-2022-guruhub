import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { AppScreenName, CourseModuleScreenName } from '~/common/enums/enums';
import { CourseModuleNavigationParamList } from '~/common/types/types';
import { BackButton } from '~/components/common/common';
import { About, Task } from '~/components/course-module/components/components';
import { useAppNavigate, useAppSelector, useEffect } from '~/hooks/hooks';

import { SCREEN_OPTIONS } from './common/constants';

const Tab = createMaterialTopTabNavigator<CourseModuleNavigationParamList>();

const CourseModule: FC = () => {
  const navigation = useAppNavigate();

  const { isMentor } = useAppSelector(({ courses }) => ({
    isMentor: courses.isMentor,
  }));

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={(): void => navigation.navigate(AppScreenName.COURSE)}
        />
      ),
    });
  }, []);

  return (
    <Tab.Navigator screenOptions={SCREEN_OPTIONS}>
      <Tab.Screen name={CourseModuleScreenName.ABOUT} component={About} />
      {!isMentor && (
        <Tab.Screen name={CourseModuleScreenName.TASK} component={Task} />
      )}
    </Tab.Navigator>
  );
};

export { CourseModule };
