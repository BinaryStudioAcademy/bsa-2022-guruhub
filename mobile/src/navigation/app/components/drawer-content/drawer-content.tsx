import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { FC } from 'react';

import logo from '~/assets/images/logo.png';
import { AppScreenName } from '~/common/enums/enums';
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
} from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { NAVIGATION_ITEMS } from '~/navigation/app/common/constants';
import {
  BecomeMentor,
  DrawerList,
} from '~/navigation/app/components/components';
import { createInterview } from '~/store/interviews/actions';

import { styles } from './styles';

const DrawerContent: FC<DrawerContentComponentProps> = ({ state }) => {
  const dispatch = useAppDispatch();
  const focusedRouteName = state.routes[state.index].name as AppScreenName;
  const allowedRoutes = state.routes.map((item) => item.name);
  const visibleNavigationItems = NAVIGATION_ITEMS.filter(
    (item) => item.isVisible,
  );

  const isBecomeMentorVisible = useAppSelector(
    ({ courses }) => courses.isMentorBecomingVisible,
  );

  const handleBecomeMentor = (): void => {
    dispatch(createInterview());
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
        {isBecomeMentorVisible && <BecomeMentor onPress={handleBecomeMentor} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export { DrawerContent };
