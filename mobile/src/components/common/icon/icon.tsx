import React, { FC } from 'react';
import { ImageStyle, StyleProp } from 'react-native';

import { IconName } from '~/common/types/ui/icon-name.type';

import { iconNameToIcon } from './common/maps/icon-name-to-icon.map';

type Props = {
  name: IconName;
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ImageStyle>;
};

const Icon: FC<Props> = ({ name, width = 16, height = 16, color, style }) => {
  const SelectedIcon = iconNameToIcon[name];

  return (
    <SelectedIcon width={width} height={height} color={color} style={style} />
  );
};

export { Icon };
