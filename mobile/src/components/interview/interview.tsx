import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { AppScreenName, InterviewScreenName } from '~/common/enums/enums';
import { InterviewNavigationParamList } from '~/common/types/types';
import { BackButton, Icon, Pressable, View } from '~/components/common/common';
import { useAppNavigate, useEffect } from '~/hooks/hooks';

import { SCREEN_OPTIONS } from './common/constants';
import { Applications, History } from './components/components';
import { styles } from './styles';

const Tab = createMaterialTopTabNavigator<InterviewNavigationParamList>();

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

  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={SCREEN_OPTIONS}>
        <Tab.Screen
          name={InterviewScreenName.APPLICATIONS}
          component={Applications}
        />
        <Tab.Screen name={InterviewScreenName.HISTORY} component={History} />
      </Tab.Navigator>
    </View>
  );
};

export { Interview };
