import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC, useEffect } from 'react';

import { MIN_SCREENS_COUNT_FOR_TABS } from '~/common/constants/constants';
import { InterviewScreenName } from '~/common/enums/enums';
import { InterviewNavigationParamList } from '~/common/types/types';
import { BackButton, View } from '~/components/common/common';
import { useAppNavigate } from '~/hooks/hooks';

import { INTERVIEW_TAB_ITEMS, TAB_OPTIONS } from './common/constants';
import { styles } from './styles';

const Tab = createMaterialTopTabNavigator<InterviewNavigationParamList>();

const Interview: FC = () => {
  const isTabsShown = INTERVIEW_TAB_ITEMS.length > MIN_SCREENS_COUNT_FOR_TABS;
  const navigation = useAppNavigate();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={navigation.goBack} />,
      headerShown: true,
    });
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={TAB_OPTIONS}>
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
