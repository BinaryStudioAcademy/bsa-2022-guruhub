import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { FC } from 'react';

import logo from '~/assets/images/logo.png';
import {
  AppScreenName,
  AuthScreenName,
  RootScreenName,
} from '~/common/enums/enums';
import {
  Image,
  Link,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '~/components/common/common';
import { getImageUri, groupByKey } from '~/helpers/helpers';
import { useAppDispatch, useAppNavigate, useAppSelector } from '~/hooks/hooks';
import { DrawerNavigationItem } from '~/navigation/app/common/types/types';
import {
  BecomeMentor,
  DrawerList,
} from '~/navigation/app/components/components';
import { authActions, coursesActions } from '~/store/actions';

import { styles } from './styles';

type Props = DrawerContentComponentProps & {
  items: DrawerNavigationItem[];
};

const DrawerContent: FC<Props> = ({ state, items }) => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();
  const focusedRouteName = state.routes[state.index].name as AppScreenName;

  const { user, isMentorBecomingVisible, dataBecomeMentorStatus } =
    useAppSelector(({ auth, courses }) => ({
      user: auth.user,
      isMentorBecomingVisible: courses.isMentorBecomingVisible,
      dataBecomeMentorStatus: courses.dataBecomeMentorStatus,
    }));

  const handleBecomeMentor = (): void => {
    dispatch(coursesActions.becomeMentor());
  };

  const handleLogout = async (): Promise<void> => {
    await dispatch(authActions.signOut());
    navigation.navigate(RootScreenName.AUTH, {
      screen: AuthScreenName.SIGN_IN,
    });
  };

  const itemGroups = groupByKey(items, 'drawerGroup');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: getImageUri(logo) }} style={styles.logo} />
        </View>
        {Object.entries(itemGroups).map(([key, value], index) => (
          <View style={styles.listWrapper} key={key}>
            {Boolean(index) && <View style={styles.listBorder} />}
            <DrawerList
              name={key}
              subroutes={value}
              focusedRouteName={focusedRouteName}
            />
          </View>
        ))}
        {isMentorBecomingVisible && user && (
          <BecomeMentor
            dataStatus={dataBecomeMentorStatus}
            onPress={handleBecomeMentor}
          />
        )}
        {user && (
          <View style={styles.singOutWrapper}>
            <Pressable onPress={handleLogout}>
              <Text style={styles.signOutLabel}>Sign Out</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
      {!user && (
        <View style={styles.signInWrapper}>
          <Link
            label="Sign in"
            to={{
              screen: RootScreenName.AUTH,
              params: { screen: AuthScreenName.SIGN_IN },
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export { DrawerContent };
