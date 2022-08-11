import React, { FC } from 'react';
import { Pressable } from 'react-native';

import { AppColor } from '~/common/enums/enums';
import { DrawerNavigationItem } from '~/common/types/types';
import { Text } from '~/components/common/common';
import { useAppNavigate } from '~/hooks/hooks';

import { styles } from './styles';

const CustomDrawerItem: FC<DrawerNavigationItem> = ({
  name,
  iconName,
  isFocused,
}) => {
  const navigation = useAppNavigate();
  const color = isFocused ? AppColor.TEXT.GRAY_100 : AppColor.TEXT.GRAY_200;
  const backgroundColor = isFocused ? AppColor.BRAND.BLUE_100 : 'transparent';

  const handlePress = (): void => {
    navigation.navigate(name);
  };

  return (
    <Pressable
      style={{ backgroundColor, ...styles.item }}
      onPress={handlePress}
    >
      <Text>{iconName}</Text>
      <Text style={{ color, ...styles.label }}>{name}</Text>
    </Pressable>
  );
};

export { CustomDrawerItem };
