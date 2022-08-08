import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const Settings: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
    </View>
  );
};

export { Settings };
