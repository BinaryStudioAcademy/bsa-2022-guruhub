import React, { FC } from 'react';

import { Text, View } from '~/components/common/common';

import { styles } from './styles';

const About: FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>About</Text>
    </View>
  );
};

export { About };
