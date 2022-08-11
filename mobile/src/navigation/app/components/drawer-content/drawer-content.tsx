import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { FC } from 'react';

import { Button, Image, ScrollView, View } from '~/components/common/common';
import { NAVIGATION_ITEMS } from '~/navigation/app/common/constants';
import { CustomDrawerList } from '~/navigation/app/components/drawer-list/drawer-list';

import { styles } from './styles';

const CustomDrawerContent: FC<DrawerContentComponentProps> = ({ state }) => {
  const focusedRouteName = state.routes[state.index].name;

  const handleBecomeMentor = (): void => {
    // TODO: navigate to application screen
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('~/assets/logo.png')} />
      </View>
      {NAVIGATION_ITEMS.map(({ name, subroutes, border }) => (
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
        <Button label="Become A Mentor" onPress={handleBecomeMentor} />
      </View>
    </ScrollView>
  );
};

export { CustomDrawerContent };
