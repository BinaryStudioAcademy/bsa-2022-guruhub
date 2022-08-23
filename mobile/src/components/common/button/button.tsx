import React, { FC } from 'react';

import { AppButtonVariant } from '~/common/enums/enums';
import { Pressable, Text } from '~/components/common/common';

import { styles } from './styles';
import { theme } from './theme';

type Props = {
  label: string;
  variant?: AppButtonVariant;
  onPress: () => void;
};

const Button: FC<Props> = ({
  label,
  variant = AppButtonVariant.PRIMARY,
  onPress,
}) => {
  return (
    <Pressable style={[styles.button, theme[variant].button]} onPress={onPress}>
      <Text style={{ ...styles.label, ...theme[variant].text }}>{label}</Text>
    </Pressable>
  );
};

export { Button };
