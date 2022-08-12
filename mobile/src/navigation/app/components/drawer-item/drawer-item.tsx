import React, { FC } from 'react';

import { AppColor } from '~/common/enums/enums';
import { DrawerNavigationItem } from '~/common/types/types';
import { Icon, Pressable, Text, View } from '~/components/common/common';
import { useAppNavigate } from '~/hooks/hooks';

import { styles } from './styles';

const DrawerItem: FC<DrawerNavigationItem> = ({ name, isFocused = false }) => {
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
      <View style={styles.iconContainer}>
        <Icon name={name} color={color} width={20} height={20} />
      </View>
      <View>
        <Text style={{ color, ...styles.label }}>{name}</Text>
      </View>
    </Pressable>
  );
};

export { DrawerItem };
