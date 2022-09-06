import React, { FC } from 'react';

import { Text, View } from '~/components/common/common';

import { styles } from './styles';

const Chat: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Chat</Text>
    </View>
  );
};

export { Chat };
