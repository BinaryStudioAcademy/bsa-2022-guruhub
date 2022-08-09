import React, { FC } from 'react';
import { ScrollView, Button, Image } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Text } from '~/components/common/common';
import { AppScreenName, AppColor, AppIcon } from '~/common/enums/enums';
import { styles } from './styles';

const CustomDrawerContent: FC<DrawerContentComponentProps> = (props) => {
  const focusedRoute = props.state.routes[props.state.index];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={AppIcon.LOGO} />
      </View>
      <View style={styles.list}>
        <Text style={styles.listTitle}>Menu</Text>
        <DrawerItem
          style={styles.listItem}
          activeTintColor={AppColor.TEXT.GRAY_100}
          inactiveTintColor={AppColor.TEXT.GRAY_200}
          activeBackgroundColor={AppColor.BRAND.BLUE_100}
          focused={focusedRoute.name === AppScreenName.OVERVIEW ? true : false}
          label={({ color }): JSX.Element => (
            <Text style={{ color, ...styles.listItemText }}>
              {AppScreenName.OVERVIEW}
            </Text>
          )}
          icon={({ focused }): JSX.Element => (
            <Image
              style={styles.icon}
              source={focused ? AppIcon.HOME_LIGHT : AppIcon.HOME_DARK}
            />
          )}
          onPress={(): void =>
            props.navigation.navigate(AppScreenName.OVERVIEW)
          }
        />
        <DrawerItem
          style={styles.listItem}
          activeTintColor={AppColor.TEXT.GRAY_100}
          inactiveTintColor={AppColor.TEXT.GRAY_200}
          activeBackgroundColor={AppColor.BRAND.BLUE_100}
          focused={focusedRoute.name === AppScreenName.COURSES ? true : false}
          label={({ color }): JSX.Element => (
            <Text style={{ color, ...styles.listItemText }}>
              {AppScreenName.COURSES}
            </Text>
          )}
          icon={({ focused }): JSX.Element => (
            <Image
              style={styles.icon}
              source={focused ? AppIcon.BOOK_LIGHT : AppIcon.BOOK_DARK}
            />
          )}
          onPress={(): void => props.navigation.navigate(AppScreenName.COURSES)}
        />
        <DrawerItem
          style={styles.listItem}
          activeTintColor={AppColor.TEXT.GRAY_100}
          inactiveTintColor={AppColor.TEXT.GRAY_200}
          activeBackgroundColor={AppColor.BRAND.BLUE_100}
          focused={focusedRoute.name === AppScreenName.MENTORS ? true : false}
          label={({ color }): JSX.Element => (
            <Text style={{ color, ...styles.listItemText }}>
              {AppScreenName.MENTORS}
            </Text>
          )}
          icon={({ focused }): JSX.Element => (
            <Image
              style={styles.icon}
              source={focused ? AppIcon.MENTORS_LIGHT : AppIcon.MENTORS_DARK}
            />
          )}
          onPress={(): void => props.navigation.navigate(AppScreenName.MENTORS)}
        />
        <DrawerItem
          style={styles.listItem}
          activeTintColor={AppColor.TEXT.GRAY_100}
          inactiveTintColor={AppColor.TEXT.GRAY_200}
          activeBackgroundColor={AppColor.BRAND.BLUE_100}
          focused={
            focusedRoute.name === AppScreenName.MY_EDUCATION ? true : false
          }
          label={({ color }): JSX.Element => (
            <Text style={{ color, ...styles.listItemText }}>
              {AppScreenName.MY_EDUCATION}
            </Text>
          )}
          icon={({ focused }): JSX.Element => (
            <Image
              style={styles.icon}
              source={
                focused ? AppIcon.EDUCATION_LIGHT : AppIcon.EDUCATION_DARK
              }
            />
          )}
          onPress={(): void =>
            props.navigation.navigate(AppScreenName.MY_EDUCATION)
          }
        />
        <View style={styles.listBorder}></View>
        <Text style={styles.listTitle}>Account</Text>
        <DrawerItem
          style={styles.listItem}
          activeTintColor={AppColor.TEXT.GRAY_100}
          inactiveTintColor={AppColor.TEXT.GRAY_200}
          activeBackgroundColor={AppColor.BRAND.BLUE_100}
          focused={focusedRoute.name === AppScreenName.BILLING ? true : false}
          label={({ color }): JSX.Element => (
            <Text style={{ color, ...styles.listItemText }}>
              {AppScreenName.BILLING}
            </Text>
          )}
          icon={({ focused }): JSX.Element => (
            <Image
              style={styles.icon}
              source={focused ? AppIcon.BILLING_LIGHT : AppIcon.BILLING_DARK}
            />
          )}
          onPress={(): void => props.navigation.navigate(AppScreenName.BILLING)}
        />
        <DrawerItem
          style={styles.listItem}
          activeTintColor={AppColor.TEXT.GRAY_100}
          inactiveTintColor={AppColor.TEXT.GRAY_200}
          activeBackgroundColor={AppColor.BRAND.BLUE_100}
          focused={focusedRoute.name === AppScreenName.SETTINGS ? true : false}
          label={({ color }): JSX.Element => (
            <Text style={{ color, ...styles.listItemText }}>
              {AppScreenName.SETTINGS}
            </Text>
          )}
          icon={({ focused }): JSX.Element => (
            <Image
              style={styles.icon}
              source={focused ? AppIcon.SETTINGS_LIGHT : AppIcon.SETTINGS_DARK}
            />
          )}
          onPress={(): void =>
            props.navigation.navigate(AppScreenName.SETTINGS)
          }
        />
      </View>
      <View style={styles.footer}>
        <Image style={styles.footerImage} source={AppIcon.SALY} />
        <Button title="Become A Mentor" />
      </View>
    </ScrollView>
  );
};

export { CustomDrawerContent };
