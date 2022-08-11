import React, { ReactElement } from 'react';

import { Image, View } from '../../../common/common';
import { styles } from './style';

const VendoLabelCoursera = (): ReactElement => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./assets/images/coursera.png')}
      />
    </View>
  );
};

export { VendoLabelCoursera };
