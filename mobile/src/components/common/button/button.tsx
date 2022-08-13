import React, { FC } from 'react';
import { Pressable } from 'react-native';

import { Text } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

const Button: FC<Props> = ({ label, onPress, disabled = false }) => {
  return (
    <Pressable style={styles.button} onPress={onPress} disabled={disabled}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export { Button };
