import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import Search from '~/assets/icons/search.svg';
import Voice from '~/assets/icons/voice.svg';
import { IconName } from '~/common/types/ui/icon-name.type';

const iconNameToIcon: Record<IconName, FC<SvgProps>> = {
  search: Search,
  voice: Voice,
};

export { iconNameToIcon };
