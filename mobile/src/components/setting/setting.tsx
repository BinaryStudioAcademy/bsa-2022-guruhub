import React, { FC } from 'react';

import { Button, Text, View } from '~/components/common/common';
import { useAppDispatch } from '~/hooks/hooks';
import { authActions } from '~/store/actions';

import { styles } from './styles';

const Settings: FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    dispatch(authActions.logout());
  };

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button label="Logout" onPress={handleLogout} />
    </View>
  );
};

export { Settings };
