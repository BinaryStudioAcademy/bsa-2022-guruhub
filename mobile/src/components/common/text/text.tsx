import React, { FC, ReactElement } from 'react';
import { Text, TextStyle } from 'react-native';

import { AppFontFamily } from '~/common/enums/ui/ui';
import { styles } from './styles';

interface FontStyle extends TextStyle {
  fontFamily: AppFontFamily;
}

type Props = {
  children: ReactElement;
  style: Omit<FontStyle, 'fontWeight' | 'fontStyle'>;
};

const TextComponent: FC<Props> = ({ style, children }) => {
  return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

export { TextComponent };
