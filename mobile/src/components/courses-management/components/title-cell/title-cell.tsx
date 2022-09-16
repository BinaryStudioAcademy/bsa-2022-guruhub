import React, { FC } from 'react';

import { Pressable, Text } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  title: string;
  onPress: () => void;
};

const TitleCell: FC<Props> = ({ onPress, title }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export { TitleCell };
