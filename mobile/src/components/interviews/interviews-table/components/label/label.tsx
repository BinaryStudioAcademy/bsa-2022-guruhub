import React, { FC } from 'react';

import { Text } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  text: string;
  color?: string;
};

const Label: FC<Props> = ({ text, color = 'darkgreen' }) => {
  return (
    <Text style={{ ...styles.label, ...{ backgroundColor: color } }}>
      {text}
    </Text>
  );
};

export { Label };
