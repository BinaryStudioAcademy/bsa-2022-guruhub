import React, { FC } from 'react';

import { Pressable, Text } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  title: string;
  onCourseSelect: () => void;
};

const TitleCell: FC<Props> = ({ title, onCourseSelect }) => {
  return (
    <Pressable onPress={onCourseSelect}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export { TitleCell };
