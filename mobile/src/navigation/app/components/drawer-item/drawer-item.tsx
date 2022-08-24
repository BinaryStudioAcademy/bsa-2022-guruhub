import React, { FC } from 'react';

import { AppColor, AppScreenName } from '~/common/enums/enums';
import { IconName } from '~/common/types/ui/icon-name.type';
import { Icon, Pressable, Text, View } from '~/components/common/common';
import { useAppNavigate } from '~/hooks/hooks';

import { styles } from './styles';

type Props = {
  name: AppScreenName;
  isFocused?: boolean;
  icon?: IconName;
};

const DrawerItem: FC<Props> = ({ name, isFocused = false, icon }) => {
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
      {icon && (
        <View style={styles.iconContainer}>
          <Icon name={icon} color={color} width={20} height={20} />
        </View>
      )}
      <View>
        <Text style={{ color, ...styles.label }}>{name}</Text>
      </View>
    </Pressable>
  );
};

export { DrawerItem };
