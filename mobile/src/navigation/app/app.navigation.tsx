import React, { FC } from 'react';
import { ParamListBase } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';

import { CustomDrawerContent } from './components/drawer-content/drawer-content';
import { AppScreenName, AppColor } from '~/common/enums/enums';
import { Overview } from '~/components/overview/overview';
import { Courses } from '~/components/courses/courses';
import { Mentors } from '~/components/mentors/mentors';
import { MyEducation } from '~/components/my-education/my-education';
import { Billing } from '~/components/billing/billing';
import { Settings } from '~/components/setting/setting';

const Drawer = createDrawerNavigator<ParamListBase>();

const screenOptions: DrawerNavigationOptions = {
  swipeEdgeWidth: 100,
  headerStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
  headerTintColor: AppColor.TEXT.GRAY_100,
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  drawerStyle: {
    width: '90%',
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
};

const App: FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName={AppScreenName.OVERVIEW}
      screenOptions={screenOptions}
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
