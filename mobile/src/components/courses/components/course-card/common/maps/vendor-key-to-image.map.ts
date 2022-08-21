import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import Udemy from '~/assets/images/vendors/udemy.svg';

const vendorsKeyToImage: Record<string, FC<SvgProps>> = {
  udemy: Udemy,
};

export { vendorsKeyToImage };
