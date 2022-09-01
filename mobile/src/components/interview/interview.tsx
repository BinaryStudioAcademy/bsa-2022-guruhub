import React, { FC } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { BackButton, Icon, Pressable } from '~/components/common/common';
import { useAppNavigate, useEffect } from '~/hooks/hooks';
import { Interview as InterviewScreen } from '~/navigation/interview/interview.navigation';

import { styles } from './styles';

const Interview: FC = () => {
  const navigation = useAppNavigate();

  const handleSearch = (): void => {
    // TODO: add handle search
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={(): void => navigation.navigate(AppScreenName.INTERVIEWS)}
        />
      ),
      headerRight: () => (
        <Pressable onPress={handleSearch} style={styles.searchIcon}>
          <Icon width={20} height={20} name="search" color="white" />
        </Pressable>
      ),
    });
  }, []);

  return <InterviewScreen />;
};

export { Interview };
