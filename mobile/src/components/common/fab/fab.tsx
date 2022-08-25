import React, { FC } from 'react';

import { Icon, Pressable, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  onPress: () => void;
};

const FAB: FC<Props> = ({ onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name="plus" color="white" />
      </View>
    </Pressable>
  );
};

export { FAB };
