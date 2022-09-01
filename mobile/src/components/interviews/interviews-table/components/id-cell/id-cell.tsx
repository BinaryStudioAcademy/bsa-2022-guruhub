import React, { FC } from 'react';

import { InterviewsUpdateRequestParamsDto } from '~/common/types/types';
import { Pressable, Text } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  id: number;
  onPress: (id: InterviewsUpdateRequestParamsDto) => void;
};

const IdCell: FC<Props> = ({ id, onPress }) => {
  return (
    <Pressable onPress={(): void => onPress({ id })}>
      <Text style={styles.id}>{`${id}`}</Text>
    </Pressable>
  );
};

export { IdCell };
