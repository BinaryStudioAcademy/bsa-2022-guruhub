import React, { FC } from 'react';

import { TaskStatus } from '~/common/enums/enums';
import { Text, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  status: TaskStatus;
};

const TaskStates: FC<Props> = ({ status }) => {
  return (
    <View style={[styles.container, styles[status]]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
};

export { TaskStates };
