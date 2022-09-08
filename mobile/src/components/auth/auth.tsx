import React, { FC, ReactElement } from 'react';

import logo from '~/assets/images/logo.png';
import { AuthScreenName, RootScreenName } from '~/common/enums/enums';
import {
  UserSignInRequestDto,
  UserSignUpRequestDto,
} from '~/common/types/types';
import { Image, ScrollView, View } from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import {
  useAppDispatch,
  useAppNavigate,
  useAppRoute,
  useAppSelector,
  useEffect,
} from '~/hooks/hooks';
import { authActions } from '~/store/actions';

import { SignInForm, SignUpForm } from './components/components';
import { styles } from './styles';

const Auth: FC = () => {
  const { name } = useAppRoute();
  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleSignInSubmit = (payload: UserSignInRequestDto): void => {
    dispatch(authActions.signIn(payload));
  };

  const handleSignUpSubmit = (payload: UserSignUpRequestDto): void => {
    dispatch(authActions.signUp(payload));
  };

  useEffect(() => {
    if (user) {
      navigation.navigate(RootScreenName.APP);
    }
  }, [user]);

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
