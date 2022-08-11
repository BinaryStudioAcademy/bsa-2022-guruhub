import React, { FC, ReactElement } from 'react';

import logo from '~/assets/images/logo.png';
import { RootScreenName } from '~/common/enums/enums';
import { UserSignUpRequestDto } from '~/common/types/types';
import { Image, View } from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import { useAppDispatch, useAppRoute } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';

import { SignInForm, SignUpForm } from './components/components';
import { styles } from './styles';

const Auth: FC = () => {
  const { name } = useAppRoute();
  const dispatch = useAppDispatch();

  const handleSignInSubmit = (): void => {
    // TODO: handle sign in
  };

  const handleSignUpSubmit = (payload: UserSignUpRequestDto): void => {
    dispatch(authActions.signUp(payload));
  };

  const getScreen = (screen: string): ReactElement | null => {
    switch (screen) {
      case RootScreenName.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case RootScreenName.SIGN_UP: {
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
      {getScreen(name)}
    </View>
  );
};

export { Auth };
