import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { InterviewScreenName } from '~/common/enums/enums';
import { InterviewNavigationParamList } from '~/common/types/types';
import { View } from '~/components/common/common';
import {
  Applications,
  History,
} from '~/components/interview/components/components';

import { SCREEN_OPTIONS } from './common/constants';
import { styles } from './styles';

const Tab = createMaterialTopTabNavigator<InterviewNavigationParamList>();

const Interview: FC = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={SCREEN_OPTIONS}>
        <Tab.Screen
          name={InterviewScreenName.APPLICATIONS}
          component={Applications}
        />
        <Tab.Screen name={InterviewScreenName.HISTORY} component={History} />
      </Tab.Navigator>
    </View>
  );
};

export { Interview };
