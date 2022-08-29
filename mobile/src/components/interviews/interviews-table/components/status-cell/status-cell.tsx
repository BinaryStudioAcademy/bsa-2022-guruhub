import React, { FC } from 'react';

import { Text } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  text: string;
  color?: string;
};

const StatusCell: FC<Props> = ({ text, color = 'transparent' }) => {
  return (
    <Text style={{ ...styles.statusCell, ...{ backgroundColor: color } }}>
      {text}
    </Text>
  );
};

export { StatusCell };
