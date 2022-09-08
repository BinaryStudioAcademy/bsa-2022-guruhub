import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import Coursera from '~/assets/images/vendors/coursera.svg';
import Edx from '~/assets/images/vendors/edx.svg';
import Udemy from '~/assets/images/vendors/udemy.svg';

const vendorsKeyToImage: Record<string, FC<SvgProps>> = {
  udemy: Udemy,
  coursera: Coursera,
  edx: Edx,
};

export { vendorsKeyToImage };
