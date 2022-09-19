import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { MIN_SCREENS_COUNT_FOR_TABS } from '~/common/constants/constants';
import { InterviewScreenName } from '~/common/enums/enums';
import { InterviewNavigationParamList } from '~/common/types/types';
import { View } from '~/components/common/common';

import { INTERVIEW_TAB_ITEMS, SCREEN_OPTIONS } from './common/constants';
import { styles } from './styles';

const Tab = createMaterialTopTabNavigator<InterviewNavigationParamList>();

const Interview: FC = () => {
  const isTabsShown = INTERVIEW_TAB_ITEMS.length > MIN_SCREENS_COUNT_FOR_TABS;

  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={SCREEN_OPTIONS}>
        {INTERVIEW_TAB_ITEMS.map((screen) => (
          <Tab.Screen
            key={screen.name}
            name={screen.name as InterviewScreenName}
            component={screen.component}
            options={{
              tabBarStyle: { display: isTabsShown ? 'flex' : 'none' },
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export { Interview };
