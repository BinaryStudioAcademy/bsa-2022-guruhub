import React, { FC } from 'react';

import { ButtonVariant } from '~/common/enums/enums';
import { IconName } from '~/common/types/types';
import { Icon, Pressable, Text } from '~/components/common/common';

import { styles } from './styles';
import { theme } from './theme';

type Props = {
  label: string;
  icon?: IconName;
  variant?: ButtonVariant;
  isDisabled?: boolean;
  onPress: () => void;
};

const Button: FC<Props> = ({
  label,
  icon,
  variant = ButtonVariant.PRIMARY,
  isDisabled,
  onPress,
}) => {
  const textMarginLeft = icon ? 10 : 0;

  return (
    <Pressable
      style={[styles.button, theme[variant].button]}
      disabled={isDisabled}
      onPress={onPress}
    >
      {icon && (
        <Icon
          name={icon}
          color={theme[variant].text.color}
          width={20}
          height={20}
        />
      )}
      <Text
        style={[
          styles.label,
          theme[variant].text,
          { marginLeft: textMarginLeft },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export { Button };
