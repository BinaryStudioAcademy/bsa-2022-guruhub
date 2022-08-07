import React, { FC } from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from '~/components/common/common';
import { RootScreenName, AppColor } from '~/common/enums/enums';
import { ParamListBase } from '~/common/types/types';
import { styles } from './styles';
import {
  DrawerNavigationHelpers,
  DrawerDescriptorMap,
} from '@react-navigation/drawer/lib/typescript/src/types';
import { DrawerNavigationState } from '@react-navigation/native';

// TODO: replace example components
function Overview(): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Overview Screen</Text>
    </View>
  );
}

function Courses(): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Courses Screen</Text>
    </View>
  );
}

function Mentors(): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mentors Screen</Text>
    </View>
  );
}

function MyEducation(): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>My Education Screen</Text>
    </View>
  );
}

function Billing(): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Billing Screen</Text>
    </View>
  );
}

function Settings(): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator<ParamListBase>();

const CustomDrawerContent = (
  props: JSX.IntrinsicAttributes & {
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
  },
): JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0 }}>
        <View>
          <View style={styles.header}>
            <Text style={{ color: '#fff' }}>GuruHub</Text>
          </View>
          <View style={styles.list}>
            <DrawerItemList {...props} />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>become a mentor</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
    </ScrollView>
  );
};

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
  drawerInactiveTintColor: AppColor.TEXT.GRAY_200,
  drawerActiveBackgroundColor: AppColor.BRAND.BLUE_100,
  drawerActiveTintColor: AppColor.TEXT.GRAY_100,
  drawerItemStyle: {
    justifyContent: 'center',
    height: 54,
    paddingHorizontal: 25,
    borderRadius: 27,
  },
  drawerLabelStyle: {
    fontSize: 16,
    fontWeight: '500',
  },
};

const App: FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName={RootScreenName.OVERVIEW}
      screenOptions={screenOptions}
      drawerContent={(props): JSX.Element => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name={RootScreenName.OVERVIEW} component={Overview} />
      <Drawer.Screen name={RootScreenName.COURSES} component={Courses} />
      <Drawer.Screen name={RootScreenName.MENTORS} component={Mentors} />
      <Drawer.Screen
        name={RootScreenName.MY_EDUCATION}
        component={MyEducation}
      />
      <Drawer.Screen name={RootScreenName.BILLING} component={Billing} />
      <Drawer.Screen name={RootScreenName.SETTINGS} component={Settings} />
    </Drawer.Navigator>
  );
};

export { App };
