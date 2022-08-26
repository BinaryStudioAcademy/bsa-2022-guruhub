import React, { FC } from 'react';

import { Text } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  text: string;
};

const Label: FC<Props> = ({ text }) => {
  return <Text style={styles.label}>{text}</Text>;
};

export { Label };
