import React, { FC, ReactElement } from 'react';

import { Text, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  index: number;
  title: string;
  description: string | null;
};

const Module: FC<Props> = ({ index, title, description }): ReactElement => {
  const moduleSequenceNumber = `${index + 1}`;

  return (
    <View style={styles.container}>
      <View style={styles.indexWrapper}>
        <Text style={styles.index}>{moduleSequenceNumber}</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </View>
  );
};

export { Module };