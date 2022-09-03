import React, { FC } from 'react';

import { Text, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  text: string;
  color: string;
};

const Chip: FC<Props> = ({ text, color }) => {
  return (
    <View style={{ ...styles.cell, backgroundColor: color }}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export { Chip };
