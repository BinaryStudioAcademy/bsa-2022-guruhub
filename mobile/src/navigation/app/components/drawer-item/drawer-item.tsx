import React, { FC } from 'react';
import { Pressable, View } from 'react-native';

import { AppColor } from '~/common/enums/enums';
import { DrawerNavigationItem } from '~/common/types/types';
import { Text } from '~/components/common/common';
import { useAppNavigate } from '~/hooks/hooks';
import { IconToDrawerItem } from '~/navigation/app/components/drawer-item/helpers/helpers';

import { styles } from './styles';

const DrawerItem: FC<DrawerNavigationItem> = ({ name, isFocused = false }) => {
  const navigation = useAppNavigate();
  const color = isFocused ? AppColor.TEXT.GRAY_100 : AppColor.TEXT.GRAY_200;
  const backgroundColor = isFocused ? AppColor.BRAND.BLUE_100 : 'transparent';
  const icon = (
    <IconToDrawerItem name={name} color={color} width={20} height={20} />
  );

  const handlePress = (): void => {
    navigation.navigate(name);
  };

  return (
    <Pressable
      style={{ backgroundColor, ...styles.item }}
      onPress={handlePress}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <View>
        <Text style={{ color, ...styles.label }}>{name}</Text>
      </View>
    </Pressable>
  );
};

export { DrawerItem };
