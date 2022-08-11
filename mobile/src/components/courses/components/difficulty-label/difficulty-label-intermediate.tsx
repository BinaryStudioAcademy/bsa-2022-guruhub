import React, { ReactElement } from 'react';

import { Image, Text, View } from '../../../common/common';
import { styles } from './style';

const DifficultyLabelIntermediate = (): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Intermediate</Text>
      <Image
        style={styles.icon}
        source={require('./assets/images/intermediate.png')}
      />
    </View>
  );
};

export { DifficultyLabelIntermediate };
