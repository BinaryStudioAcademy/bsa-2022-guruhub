import React, { FC, ReactElement } from 'react';

import logo from '~/assets/images/logo.png';
import { AuthScreenName, RootScreenName } from '~/common/enums/enums';
import {
  UserSignInRequestDto,
  UserSignUpRequestDto,
} from '~/common/types/types';
import { Image, ScrollView, View } from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import { useAppDispatch, useAppNavigate, useAppRoute } from '~/hooks/hooks';
import { authActions } from '~/store/actions';

import { SignInForm, SignUpForm } from './components/components';
import { styles } from './styles';

const Auth: FC = () => {
  const { name } = useAppRoute();
  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();

  const handleSignInSubmit = async (
    payload: UserSignInRequestDto,
  ): Promise<void> => {
    await dispatch(authActions.signIn(payload)).unwrap();
    navigation.navigate(RootScreenName.APP);
  };

  const handleSignUpSubmit = async (
    payload: UserSignUpRequestDto,
  ): Promise<void> => {
    await dispatch(authActions.signUp(payload)).unwrap();
    navigation.navigate(RootScreenName.APP);
  };

  const getScreen = (screen: string): ReactElement | null => {
    switch (screen) {
      case AuthScreenName.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case AuthScreenName.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: getImageUri(logo) }} style={styles.logo} />
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <ScrollView>{getScreen(name)}</ScrollView>
    </View>
  );
};

export { Auth };
