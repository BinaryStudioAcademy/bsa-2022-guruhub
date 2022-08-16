import React, { FC } from 'react';

import { Pressable } from 'react-native';

import { Text } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  label: string;
  onPress: () => void;
};

const Button: FC<Props> = ({ label, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export { Button };
