import React, { FC } from 'react';
import { ColorValue } from 'react-native';

import { ActivityIndicator, View } from '~/components/common/common';
import { styles } from './styles';

type Props = {
  isOverflow: boolean;
  size?: number;
  color?: ColorValue;
};

const makeActivityIndicator = (
  size: number | 'small' | 'large',
  color?: ColorValue,
): React.ReactElement => {
  return <ActivityIndicator size={size} color={color} />;
};

const Spinner: FC<Props> = ({ size, color, isOverflow }) => {
  if (isOverflow) {
    return (
      <View style={styles.overflowContainer}>
        {makeActivityIndicator(size ?? 'large', color)}
      </View>
    );
  }

  return makeActivityIndicator(size ?? 'small', color);
};

export { Spinner };
