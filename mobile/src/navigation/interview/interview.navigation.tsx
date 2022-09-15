import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { InterviewNavigationParamList } from '~/common/types/types';
import { View } from '~/components/common/common';

import {
  COUNT_TABS_FOR_HIDE,
  INTERVIEW_TAB_ITEMS,
  SCREEN_OPTIONS,
} from './common/constants';
import { styles } from './styles';

const Tab = createMaterialTopTabNavigator<InterviewNavigationParamList>();

const Interview: FC = () => {
  const isTabsShown = INTERVIEW_TAB_ITEMS.length === COUNT_TABS_FOR_HIDE;

  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={SCREEN_OPTIONS}>
        {INTERVIEW_TAB_ITEMS.map((screen) => (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              tabBarStyle: { display: isTabsShown ? 'none' : 'flex' },
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export { Interview };
