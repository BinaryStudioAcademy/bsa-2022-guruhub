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
  SafeAreaView,
  ScrollView,
  View,
} from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { groupByKey } from '~/navigation/app/common/helpers/helpers';
import { DrawerNavigationItem } from '~/navigation/app/common/types/types';
import {
  BecomeMentor,
  DrawerList,
} from '~/navigation/app/components/components';
import { coursesActions } from '~/store/actions';

import { styles } from './styles';

type Props = DrawerContentComponentProps & {
  items: DrawerNavigationItem[];
};

const DrawerContent: FC<Props> = ({ state, items }) => {
  const dispatch = useAppDispatch();
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
