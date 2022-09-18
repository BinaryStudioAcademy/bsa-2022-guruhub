import React, { FC } from 'react';

import { AppColor } from '~/common/enums/enums';
import { Icon, TouchableOpacity, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  onPress: () => void;
  isDisabled: boolean;
};

const SendButton: FC<Props> = ({ onPress, isDisabled }) => {
  return (
    <View style={[styles.button, isDisabled && styles.disabledButton]}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.iconShadow}
        disabled={isDisabled}
      />
      <View style={styles.icon}>
        <Icon
          color={AppColor.BRAND.BLUE_100}
          width={25}
          height={25}
          name="send"
        />
      </View>
    </View>
  );
};

export { SendButton };
