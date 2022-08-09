import React, { FC } from 'react';
import { Text as UIText } from 'react-native';


import { TextStyle } from '~/common/types/types';
import { styles } from './styles';

type Props = {
  children: string;
  style?: TextStyle;
};

const Text: FC<Props> = ({ style, children }) => {
  return <UIText style={{ ...styles.text, ...style }}>{children}</UIText>;
};

export { Text };
