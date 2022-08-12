import React, { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import {
  Billing,
  Book,
  Education,
  Home,
  Mentors,
  Message,
  Search,
  Settings,
  Voice,
} from '~/assets/icons/icons';
import { IconName } from '~/common/types/ui/icon-name.type';

const iconNameToIcon: Record<IconName, FC<SvgProps>> = {
  search: Search,
  voice: Voice,
  home: Home,
  message: Message,
  education: Education,
  billing: Billing,
  mentors: Mentors,
  settings: Settings,
  book: Book,
};

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
