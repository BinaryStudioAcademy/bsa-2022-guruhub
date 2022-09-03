import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { FC } from 'react';

import logo from '~/assets/images/logo.png';
import saly from '~/assets/images/saly.png';
import { AppScreenName } from '~/common/enums/enums';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  View,
} from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import { NAVIGATION_ITEMS } from '~/navigation/app/common/constants';
import { DrawerList } from '~/navigation/app/components/components';

import { styles } from './styles';

const DrawerContent: FC<DrawerContentComponentProps> = ({ state }) => {
  const focusedRouteName = state.routes[state.index].name as AppScreenName;
  const allowedRoutes = state.routes.map((item) => item.name);
  const visibleNavigationItems = NAVIGATION_ITEMS.filter(
    (item) => item.isVisible,
  );

  const handleBecomeMentor = (): void => {
    // TODO: navigate to application screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: getImageUri(logo) }} style={styles.logo} />
        </View>
        {visibleNavigationItems.map(({ name, subroutes }, index) => (
          <View style={styles.listWrapper} key={name}>
            {Boolean(index) && <View style={styles.listBorder} />}
            <DrawerList
              name={name}
              subroutes={subroutes.filter((item) =>
                allowedRoutes.includes(item.name),
              )}
              focusedRouteName={focusedRouteName}
            />
          </View>
        ))}
        <View style={styles.footer}>
          <Image
            style={styles.footerImage}
            source={{ uri: getImageUri(saly) }}
          />
          <Button label="Become A Mentor" onPress={handleBecomeMentor} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export { DrawerContent };
