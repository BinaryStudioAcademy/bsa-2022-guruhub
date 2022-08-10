import {
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import React, { FC } from 'react';
import { Button, Image, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';

import Billing from '~/assets/icons/billing.svg';
import Book from '~/assets/icons/book.svg';
import Education from '~/assets/icons/education.svg';
import Home from '~/assets/icons/home.svg';
import Mentors from '~/assets/icons/mentors.svg';
import Settings from '~/assets/icons/settings.svg';
import { AppColor, AppScreenName } from '~/common/enums/enums';
import { Text, View } from '~/components/common/common';

import { styles } from './styles';

const CustomDrawerContent: FC<DrawerContentComponentProps> = (props) => {
  const focusedRoute = props.state.routes[props.state.index];

  const handleNavigateTo = (route: string): void => {
    props.navigation.navigate(route);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('~/assets/logo.png')} />
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
          icon={({ color }): JSX.Element => (
            <SvgXml
              style={styles.icon}
              color={color}
              width="22"
              height="22"
              xml={Home}
            />
          )}
          onPress={(): void => handleNavigateTo(AppScreenName.OVERVIEW)}
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
          icon={({ color }): JSX.Element => (
            <SvgXml
              style={styles.icon}
              color={color}
              width="22"
              height="22"
              xml={Book}
            />
          )}
          onPress={(): void => handleNavigateTo(AppScreenName.COURSES)}
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
          icon={({ color }): JSX.Element => (
            <SvgXml
              style={styles.icon}
              color={color}
              width="22"
              height="22"
              xml={Mentors}
            />
          )}
          onPress={(): void => handleNavigateTo(AppScreenName.MENTORS)}
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
          icon={({ color }): JSX.Element => (
            <SvgXml
              style={styles.icon}
              color={color}
              width="22"
              height="22"
              xml={Education}
            />
          )}
          onPress={(): void => handleNavigateTo(AppScreenName.MY_EDUCATION)}
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
          icon={({ color }): JSX.Element => (
            <SvgXml
              style={styles.icon}
              color={color}
              width="22"
              height="22"
              xml={Billing}
            />
          )}
          onPress={(): void => handleNavigateTo(AppScreenName.BILLING)}
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
          icon={({ color }): JSX.Element => (
            <SvgXml
              style={styles.icon}
              color={color}
              width="22"
              height="22"
              xml={Settings}
            />
          )}
          onPress={(): void => handleNavigateTo(AppScreenName.SETTINGS)}
        />
      </View>
      <View style={styles.footer}>
        <Image
          style={styles.footerImage}
          source={require('~/assets/saly.png')}
        />
        <Button title="Become A Mentor" />
      </View>
    </ScrollView>
  );
};

export { CustomDrawerContent };
