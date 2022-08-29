import React, { FC } from 'react';

import { Text, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  text: string;
  color?: string;
};

const StatusCell: FC<Props> = ({ text, color = 'transparent' }) => {
  return (
    <View style={styles.statusCellWrapper}>
      <Text style={{ ...styles.statusCell, backgroundColor: color }}>
        {text}
      </Text>
    </View>
  );
};

export { StatusCell };
