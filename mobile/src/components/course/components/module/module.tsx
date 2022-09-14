import React, { FC, ReactElement } from 'react';

import { Chip, Content, Text, View } from '~/components/common/common';
import { useWindowDimensions } from '~/hooks/hooks';

import { styles } from './styles';

type Props = {
  index: number;
  title: string;
  description: string | null;
  isMentor: boolean;
};

const Module: FC<Props> = ({
  index,
  title,
  description,
  isMentor,
}): ReactElement => {
  const { width } = useWindowDimensions();
  const moduleSequenceNumber = `${index + 1}.`;

  return (
    <View style={styles.container}>
      <View style={styles.indexWrapper}>
        <Text style={styles.index}>{moduleSequenceNumber}</Text>
        {isMentor && <Chip />}
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        {description && (
          <Content
            html={description}
            width={width}
            style={styles.description}
          />
        )}
      </View>
    </View>
  );
};

export { Module };
