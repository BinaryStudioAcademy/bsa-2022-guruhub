import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import Coursera from '~/assets/images/vendors/coursera-logo.svg';
import Udemy from '~/assets/images/vendors/udemy-logo.svg';

const vendorsKeyToImage: Record<string, FC<SvgProps>> = {
  udemy: Udemy,
  coursera: Coursera,
};

export { vendorsKeyToImage };
