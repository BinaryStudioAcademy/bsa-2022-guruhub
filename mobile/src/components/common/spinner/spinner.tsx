import React, { FC } from 'react';
import { ActivityIndicator, ColorValue } from 'react-native';

import { AppColor } from '~/common/enums/enums';
import { styles } from './styles';

type Props = {
  isOverflow?: boolean;
  color?: ColorValue;
};

const Spinner: FC<Props> = ({
  isOverflow = false,
  color = AppColor.BRAND.BLUE_100,
}) => {
  return (
    <ActivityIndicator
      size={isOverflow ? 'large' : 'small'}
      style={isOverflow ? styles.overflowContainer : null}
      color={color}
    />
  );
};

export { Spinner };
