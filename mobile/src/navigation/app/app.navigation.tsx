import React, { FC } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { AppScreenName } from '~/common/enums/enums';
import { AppNavigationParamList } from '~/common/types/types';
import { Billing } from '~/components/billing/billing';
import { Courses } from '~/components/courses/courses';
import { Mentors } from '~/components/mentors/mentors';
import { MyEducation } from '~/components/my-education/my-education';
import { Overview } from '~/components/overview/overview';
import { Settings } from '~/components/setting/setting';
import { UAM } from '~/components/uam/uam';

import { SCREEN_OPTIONS } from './common/constants';
import { DrawerContent } from './components/components';

const Drawer = createDrawerNavigator<AppNavigationParamList>();

const App: FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName={AppScreenName.OVERVIEW}
      screenOptions={SCREEN_OPTIONS}
      drawerContent={(props): JSX.Element => <DrawerContent {...props} />}
    >
      <Drawer.Screen name={AppScreenName.OVERVIEW} component={Overview} />
      <Drawer.Screen name={AppScreenName.COURSES} component={Courses} />
      <Drawer.Screen name={AppScreenName.MENTORS} component={Mentors} />
      <Drawer.Screen
        name={AppScreenName.MY_EDUCATION}
        component={MyEducation}
      />
      <Drawer.Screen name={AppScreenName.BILLING} component={Billing} />
      <Drawer.Screen name={AppScreenName.SETTINGS} component={Settings} />
      <Drawer.Screen name={AppScreenName.UAM} component={UAM} />
    </Drawer.Navigator>
  );
};

export { App };
