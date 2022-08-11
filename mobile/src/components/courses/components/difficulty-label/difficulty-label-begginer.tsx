import React, { ReactElement } from 'react';

import { Image, Text, View } from '../../../common/common';
import { styles } from './style';

const DifficultyLabelBegginer = (): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Begginer</Text>
      <Image
        style={styles.icon}
        source={require('./assets/images/begginer.png')}
      />
    </View>
  );
};

export { DifficultyLabelBegginer };
