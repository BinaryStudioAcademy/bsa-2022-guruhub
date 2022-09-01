import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { CourseScreenName } from '~/common/enums/enums';
import { CourseNavigationParamList } from '~/common/types/types';
import { BackButton } from '~/components/common/common';
import { ChooseMentor } from '~/components/course/components/components';
import { Course as CourseScreen } from '~/components/course/course';
import { useAppNavigate, useEffect } from '~/hooks/hooks';

import { SCREEN_OPTIONS } from './common/constants';

const Tab = createMaterialTopTabNavigator<CourseNavigationParamList>();

const Course: FC = () => {
  const navigation = useAppNavigate();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={navigation.goBack} />,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={SCREEN_OPTIONS}
      initialRouteName={CourseScreenName.ABOUT}
    >
      <Tab.Screen name={CourseScreenName.ABOUT} component={CourseScreen} />
      <Tab.Screen name={CourseScreenName.MY_MENTOR} component={ChooseMentor} />
    </Tab.Navigator>
  );
};

export { Course };
