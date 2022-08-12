import React, { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import Search from '~/assets/icons/search.svg';
import Voice from '~/assets/icons/voice.svg';
import { IconName } from '~/common/types/ui/icon-name.type';

const iconNameToIcon: Record<IconName, FC<SvgProps>> = {
  search: Search,
  voice: Voice,
};

type Props = {
  name: IconName;
  size?: {
    width: number;
    height: number;
  };
  fill?: string;
};

const Icon: FC<Props> = ({ name, size = { width: 16, height: 16 }, fill }) => {
  const SelectedIcon = iconNameToIcon[name];

  return <SelectedIcon width={size.width} height={size.height} fill={fill} />;
};

export { Icon };
