import React, { FC } from 'react';

import { Text, View } from '~/components/common/common';

import { styles } from './styles';

const Task: FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>History</Text>
    </View>
  );
};

export { Task };
