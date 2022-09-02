import React, { FC } from 'react';

import { AppColor, ButtonVariant } from '~/common/enums/enums';
import { IconName } from '~/common/types/types';
import {
  Icon,
  Pressable,
  Spinner,
  Text,
  View,
} from '~/components/common/common';

import { styles } from './styles';

type Props = {
  label: string;
  icon?: IconName;
  variant?: ButtonVariant;
  size: 'small' | 'large';
  onPress: () => void;
  isLoading?: boolean;
};

const Button: FC<Props> = ({
  label,
  icon,
  variant,
  onPress,
  size,
  isLoading,
}) => {
  const textMarginLeft = icon ? 10 : 0;
  const loaderColor =
    variant === ButtonVariant.PRIMARY
      ? AppColor.TEXT.GRAY_100
      : AppColor.BRAND.BLUE_100;

  const sizeStyle = size === 'small' ? 'buttonSmall' : 'buttonLarge';

  return (
    <Pressable
      style={[
        styles.button,
        styles[`button${variant}`],
        styles[`${sizeStyle}`],
      ]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading && (
        <View style={styles.loader}>
          <Spinner color={loaderColor} />
        </View>
      )}

      {icon && (
        <Icon
          name={icon}
          color={styles[`button${variant}Label`].color}
          width={20}
          height={20}
        />
      )}

      <Text
        style={{
          ...styles.label,
          ...styles[`button${variant}Label`],
          marginLeft: textMarginLeft,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export { Button };
