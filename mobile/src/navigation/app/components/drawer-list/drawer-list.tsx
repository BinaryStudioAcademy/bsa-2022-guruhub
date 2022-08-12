import React, { FC } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { DrawerNavigationItem } from '~/common/types/types';
import { Text, View } from '~/components/common/common';

import { DrawerItem } from '../drawer-item/drawer-item';
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
      {subroutes.map(({ name }) => {
        return (
          <DrawerItem
            key={name}
            name={name}
            isFocused={focusedRouteName === name}
          />
        );
      })}
    </View>
  );
};

export { DrawerList };
