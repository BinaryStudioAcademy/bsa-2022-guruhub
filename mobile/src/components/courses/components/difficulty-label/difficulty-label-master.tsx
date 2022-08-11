import React, { ReactElement } from 'react';

import { Image, Text, View } from '../../../common/common';
import { styles } from './style';

const DifficultyLabelMaster = (): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Master</Text>
      <Image
        style={styles.icon}
        source={require('./assets/images/master.png')}
      />
    </View>
  );
};

export { DifficultyLabelMaster };
