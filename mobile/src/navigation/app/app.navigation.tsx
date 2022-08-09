import React, { FC } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { CustomDrawerContent } from './components/drawer-content/drawer-content';
import { AppScreenName } from '~/common/enums/enums';
import { Overview } from '~/components/overview/overview';
import { Courses } from '~/components/courses/courses';
import { Mentors } from '~/components/mentors/mentors';
import { MyEducation } from '~/components/my-education/my-education';
import { Billing } from '~/components/billing/billing';
import { Settings } from '~/components/setting/setting';
import { SCREEN_OPTIONS } from './common/constants';
import { AppNavigationParamList } from '~/common/types/navigation/app-navigation-param-list.type';

const Drawer = createDrawerNavigator<AppNavigationParamList>();

const App: FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName={AppScreenName.OVERVIEW}
      screenOptions={SCREEN_OPTIONS}
      drawerContent={(props): JSX.Element => <CustomDrawerContent {...props} />}
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
    </Drawer.Navigator>
  );
};

export { App };
