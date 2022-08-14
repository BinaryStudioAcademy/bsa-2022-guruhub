import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { FC } from 'react';

import logo from '~/assets/images/logo.png';
import saly from '~/assets/images/saly.png';
import { AppScreenName } from '~/common/enums/enums';
import { Button, Image, ScrollView, View } from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import { NAVIGATION_ITEMS } from '~/navigation/app/common/constants';
import { DrawerList } from '~/navigation/app/components/components';

import { styles } from './styles';

const DrawerContent: FC<DrawerContentComponentProps> = ({ state }) => {
  const focusedRouteName = state.routes[state.index].name as AppScreenName;

  const handleBecomeMentor = (): void => {
    // TODO: navigate to application screen
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: getImageUri(logo) }} style={styles.logo} />
      </View>
      {NAVIGATION_ITEMS.map(({ name, subroutes }, index) => (
        <View style={styles.listWrapper} key={name}>
          {Boolean(index) && <View style={styles.listBorder} />}
          <DrawerList
            name={name}
            subroutes={subroutes}
            focusedRouteName={focusedRouteName}
          />
        </View>
      ))}
      <View style={styles.footer}>
        <Image style={styles.footerImage} source={{ uri: getImageUri(saly) }} />
        <Button label="Become A Mentor" onPress={handleBecomeMentor} />
      </View>
    </ScrollView>
  );
};

export { DrawerContent };
