import React, { FC } from 'react';
import { Text as UIText, TextStyle as UITextStyle } from 'react-native';

import { AppFontFamily } from '~/common/enums/enums';

import { styles } from './styles';

type TextStyle = UITextStyle & {
  fontFamily?: AppFontFamily;
};

type Props = {
  children: string;
  style?: Omit<TextStyle, 'fontWeight' | 'fontStyle'>;
};

const Text: FC<Props> = ({ style, children }) => {
  return <UIText style={{ ...styles.text, ...style }}>{children}</UIText>;
};

export { Text };
