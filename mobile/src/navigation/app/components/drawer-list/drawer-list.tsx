import React, { FC } from 'react';

import { DrawerNavigationList } from '~/common/types/types';
import { Text, View } from '~/components/common/common';
import { CustomDrawerItem } from '~/navigation/app/components/drawer-item/drawer-item';

import { styles } from './styles';

const CustomDrawerList: FC<DrawerNavigationList> = ({
  name,
  subroutes,
  focusedRouteName,
}) => {
  return (
    <View style={styles.list}>
      <Text style={styles.listTitle}>{name}</Text>
      {subroutes.map(({ name, iconName }) => {
        return (
          <CustomDrawerItem
            key={name}
            name={name}
            icon={iconName}
            focusedRouteName={focusedRouteName}
          />
        );
      })}
    </View>
  );
};

export { CustomDrawerList };
