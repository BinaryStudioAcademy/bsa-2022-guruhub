import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { AppColor } from '~/common/enums/enums';
import { DrawerNavigationItem } from '~/common/types/types';
import { Text } from '~/components/common/common';

import { styles } from './styles';

const CustomDrawerItem: FC<DrawerNavigationItem> = ({
  name,
  icon,
  focusedRouteName,
}) => {
  const navigation = useNavigation();
  const focused = focusedRouteName === name ? true : false;
  const color = focused ? AppColor.TEXT.GRAY_100 : AppColor.TEXT.GRAY_200;
  const backgroundColor = focused ? AppColor.BRAND.BLUE_100 : 'transparent';

  const handleNavigateTo = (name: any): void => {
    navigation.navigate(name);
  };

  return (
    <Pressable
      style={{ backgroundColor, ...styles.item }}
      onPress={(): void => handleNavigateTo(name)}
    >
      <SvgXml
        style={styles.itemIcon}
        color={color}
        width="22"
        height="22"
        xml={icon}
      />
      <Text style={{ color, ...styles.itemText }}>{name}</Text>
    </Pressable>
  );
};

export { CustomDrawerItem };
