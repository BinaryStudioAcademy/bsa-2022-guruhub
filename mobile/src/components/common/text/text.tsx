import React, { FC } from 'react';
import { Text, TextStyle } from 'react-native';

import { AppFontFamily } from '~/common/enums/ui/app-font.enum';
import { styles } from './styles';

interface FontStyle extends TextStyle {
  fontFamily: AppFontFamily;
}

type Props = {
  children: JSX.Element;
  style: Omit<FontStyle, 'fontWeight' | 'fontStyle'>;
};

const TextComponent: FC<Props> = ({ style, children }) => {
  return <Text style={[{ ...styles.default }, style]}>{children}</Text>;
};

export { TextComponent };
