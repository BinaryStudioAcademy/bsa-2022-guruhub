import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { FC } from 'react';

import billing from '~/assets/icons/billing.svg';
import book from '~/assets/icons/book.svg';
import education from '~/assets/icons/education.svg';
import home from '~/assets/icons/home.svg';
import mentors from '~/assets/icons/mentors.svg';
import settings from '~/assets/icons/settings.svg';
import { AppScreenName } from '~/common/enums/enums';
import { Button, Image, ScrollView, View } from '~/components/common/common';
import { CustomDrawerList } from '~/navigation/app/components/drawer-list/drawer-list';

import { styles } from './styles';

const routes = [
  {
    name: 'Menu',
    border: true,
    subroutes: [
      {
        name: AppScreenName.OVERVIEW,
        iconName: home,
      },
      {
        name: AppScreenName.COURSES,
        iconName: book,
      },
      {
        name: AppScreenName.MENTORS,
        iconName: mentors,
      },
      {
        name: AppScreenName.MY_EDUCATION,
        iconName: education,
      },
    ],
  },
  {
    name: 'Account',
    subroutes: [
      {
        name: AppScreenName.BILLING,
        iconName: billing,
      },
      {
        name: AppScreenName.SETTINGS,
        iconName: settings,
      },
    ],
  },
];

const CustomDrawerContent: FC<DrawerContentComponentProps> = ({
  state,
  navigation,
}) => {
  const focusedRouteName = state.routes[state.index].name;

  const handleNavigateTo = (name: AppScreenName): void => {
    navigation.navigate(name);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('~/assets/logo.png')} />
      </View>
      {routes.map(({ name, subroutes, border }) => (
        <View style={styles.listWrapper} key={name}>
          <CustomDrawerList
            name={name}
            subroutes={subroutes}
            focusedRouteName={focusedRouteName}
          />
          {border ? <View style={styles.listBorder}></View> : ''}
        </View>
      ))}
      <View style={styles.footer}>
        <Image
          style={styles.footerImage}
          source={require('~/assets/saly.png')}
        />
        <Button
          label="Become A Mentor"
          onPress={(): void => handleNavigateTo(AppScreenName.SETTINGS)}
        />
      </View>
    </ScrollView>
  );
};

export { CustomDrawerContent };
