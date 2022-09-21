import React, { FC } from 'react';

import { InterviewsUpdateRequestParamsDto } from '~/common/types/types';
import { Pressable, Text } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  id: number;
  onPress: (id: InterviewsUpdateRequestParamsDto) => void;
};

const IdCell: FC<Props> = ({ id, onPress }) => {
  const hitSlop = { top: 10, bottom: 10, left: 10, right: 10 };

  const handlePress = (): void => {
    onPress({ id });
  };

  return (
    <Pressable hitSlop={hitSlop} onPress={handlePress}>
      <Text style={styles.id}>{id.toString()}</Text>
    </Pressable>
  );
};

export { IdCell };
