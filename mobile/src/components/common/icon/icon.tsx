import React, { FC } from 'react';

import { IconName } from '~/common/types/ui/icon-name.type';
import { iconNameToIcon } from '~/components/common/icon/common/maps/icon-name-to-icon.map';

type Props = {
  name: IconName;
  width?: number;
  height?: number;
  color?: string;
};

const Icon: FC<Props> = ({ name, width = 16, height = 16, color }) => {
  const SelectedIcon = iconNameToIcon[name];

  return <SelectedIcon width={width} height={height} fill={color} />;
};

export { Icon };
