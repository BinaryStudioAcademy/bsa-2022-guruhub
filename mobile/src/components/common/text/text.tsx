import React, { FC } from 'react';
import { Text as UIText } from 'react-native';

import { AppTextStyle } from '~/common/types/types';

import { styles } from './styles';

type Props = {
  children: string | React.ReactNode;
  style?: AppTextStyle;
};

const Text: FC<Props> = ({ style, children }) => {
  return <UIText style={{ ...styles.text, ...style }}>{children}</UIText>;
};

export { Text };
