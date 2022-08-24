import React, { FC } from 'react';

import { Pressable } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  onPress: () => void;
};

const BackButton: FC<Props> = ({ onPress }) => {
  return (
    <Pressable
      style={styles.backButton}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={onPress}
    />
  );
};

export { BackButton };
