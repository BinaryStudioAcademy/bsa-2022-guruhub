import React, { FC } from 'react';

import { ButtonVariant } from '~/common/enums/enums';
import { IconName } from '~/common/types/types';
import { Icon, Pressable, Text } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  label: string;
  icon?: IconName;
  variant?: ButtonVariant;
  onPress: () => void;
};

const Button: FC<Props> = ({ label, icon, variant, onPress }) => {
  const textMarginLeft = icon ? 10 : 0;

  return (
    <Pressable
      style={[styles.button, styles[`button${variant}`]]}
      onPress={onPress}
    >
      {icon && (
        <Icon
          name={icon}
          color={styles[`button${variant}Label`].color}
          width={20}
          height={20}
        />
      )}
      <Text
        style={{
          ...styles.label,
          ...styles[`button${variant}Label`],
          marginLeft: textMarginLeft,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export { Button };
