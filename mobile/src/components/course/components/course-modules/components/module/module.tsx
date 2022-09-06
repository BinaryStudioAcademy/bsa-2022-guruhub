import React, { FC, ReactElement } from 'react';

import { Content, Pressable, Text, View } from '~/components/common/common';
import { useWindowDimensions } from '~/hooks/hooks';

import { styles } from './styles';

type Props = {
  index: number;
  title: string;
  description: string | null;
  onPress: () => void;
};

const Module: FC<Props> = ({
  index,
  title,
  description,
  onPress,
}): ReactElement => {
  const { width } = useWindowDimensions();
  const moduleSequenceNumber = `${index + 1}.`;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.indexWrapper}>
        <Text style={styles.index}>{moduleSequenceNumber}</Text>
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
    </Pressable>
  );
};

export { Module };
