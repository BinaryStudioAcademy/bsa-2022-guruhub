import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { AppScreenName, CourseModuleScreenName } from '~/common/enums/enums';
import { CourseModuleNavigationParamList } from '~/common/types/types';
import { BackButton } from '~/components/common/common';
import { useAppNavigate, useAppSelector, useEffect } from '~/hooks/hooks';

import { MODULE_TAB_ITEMS, SCREEN_OPTIONS } from './common/constants';

const Tab = createMaterialTopTabNavigator<CourseModuleNavigationParamList>();

const CourseModule: FC = () => {
  const navigation = useAppNavigate();

  const { isMentor } = useAppSelector(({ courses }) => ({
    isMentor: courses.isMentor,
  }));

  const isShowTaskScreen = isMentor && CourseModuleScreenName.TASK;
  const filteredScreens = MODULE_TAB_ITEMS.filter(
    (screen) => screen.name !== isShowTaskScreen,
  );
  const isShowTabs = filteredScreens.length === 1;

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
      {filteredScreens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={isShowTabs ? { tabBarStyle: { display: 'none' } } : {}}
        />
      ))}
    </Tab.Navigator>
  );
};

export { CourseModule };
