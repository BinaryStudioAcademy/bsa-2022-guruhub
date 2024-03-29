import React, { FC } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { Text, View } from '~/components/common/common';
import { DrawerItem } from '~/navigation/app/components/components';

import { DrawerNavigationItem } from '../../common/types/types';
import { styles } from './styles';

type Props = {
  name: string;
  subroutes: DrawerNavigationItem[];
  focusedRouteName: AppScreenName;
};

const DrawerList: FC<Props> = ({ name, subroutes, focusedRouteName }) => {
  return (
    <View style={styles.list}>
      <Text style={styles.listTitle}>{name}</Text>
      {subroutes.map(({ name, icon }) => {
        return (
          <DrawerItem
            key={name}
            name={name as AppScreenName}
            isFocused={focusedRouteName === name}
            icon={icon}
          />
        );
      })}
    </View>
  );
};

export { DrawerList };
