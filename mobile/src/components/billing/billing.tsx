import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const Billing: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Billing Screen</Text>
    </View>
  );
};

export { Billing };
