import React, { FC } from 'react';
import { Pressable, ViewStyle as UIViewStyle } from 'react-native';

import { TextStyle } from '~/common/types/types';
import { Text } from '~/components/common/common';
import { styles } from './styles';

type Props = {
  label: string;
  onPress: () => void;
  buttonStyle?: UIViewStyle;
  labelStyle?: TextStyle;
};

const Button: FC<Props> = ({ label, onPress, buttonStyle, labelStyle }) => {
  return (
    <Pressable style={{ ...styles.button, ...buttonStyle }} onPress={onPress}>
      <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
    </Pressable>
  );
};

export { Button };
