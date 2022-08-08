import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const Overview: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Overview Screen</Text>
    </View>
  );
};

export { Overview };
