import React, { FC, ReactElement } from 'react';
import { Text,View } from 'react-native';

import { styles } from './style';

const BestsellerLabel: FC = (): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>bestseller</Text>
    </View>
  );
};

export { BestsellerLabel };
