import React, { FC } from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from '~/components/common/common';
import { RootScreenName } from '~/common/enums/enums';
import { ParamListBase } from '~/common/types/types';
import { styles } from './styles';

// TODO: replace example components
function Overview(): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Overview Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator<ParamListBase>();

const CustomDrawerItem = ({ label }: any): JSX.Element => {
  return (
    <TouchableOpacity style={styles.listItem}>
      <Text style={styles.listItemText}>{label}</Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = (): JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0 }}>
        <View>
          <View style={styles.header}>
            <Text style={{ color: '#fff' }}>GuruHub</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listTitle}>Menu</Text>
            <CustomDrawerItem label={RootScreenName.OVERVIEW} />
            <CustomDrawerItem label={RootScreenName.COURSES} />
            <CustomDrawerItem label={RootScreenName.MENTORS} />
            <CustomDrawerItem label={RootScreenName.MY_EDUCATION} />
            <View style={styles.listBorder} />
            <Text style={styles.listTitle}>Account</Text>
            <CustomDrawerItem label={RootScreenName.BILLING} />
            <CustomDrawerItem label={RootScreenName.SETTINGS} />
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

// TODO: take colors from color palette, add icons
const screenOptions: DrawerNavigationOptions = {
  swipeEdgeWidth: 100,
  headerStyle: {
    backgroundColor: '#242636',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  drawerStyle: {
    width: '90%',
    backgroundColor: '#242636',
  },
};

const App: FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName={RootScreenName.OVERVIEW}
      screenOptions={screenOptions}
      drawerContent={(): JSX.Element => <CustomDrawerContent />}
    >
      <Drawer.Screen name="Overlay">
        {(props): JSX.Element => <Overview {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export { App };
