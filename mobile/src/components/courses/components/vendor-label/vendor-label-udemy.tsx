import React, { ReactElement } from 'react';

import { Image, View } from '../../../common/common';
import { styles } from './style';

const VendoLabelUdemy = (): ReactElement => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./assets/images/udemy.png')}
      />
    </View>
  );
};

export { VendoLabelUdemy };
