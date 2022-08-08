import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from '@react-navigation/drawer/lib/typescript/src/types';
import { DrawerNavigationState, ParamListBase } from '@react-navigation/native';
import { View, Text } from '~/components/common/common';
import { styles } from './styles';

const CustomDrawerContent = (
  props: JSX.IntrinsicAttributes & {
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
  },
): JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <DrawerContentScrollView contentContainerStyle={styles.drawerContainer}>
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

export { CustomDrawerContent };
