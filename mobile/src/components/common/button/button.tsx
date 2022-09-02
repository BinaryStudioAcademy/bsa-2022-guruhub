import React, { FC } from 'react';
import { ViewStyle } from 'react-native';

import { ButtonVariant } from '~/common/enums/enums';
import { IconName } from '~/common/types/types';
import {
  Icon,
  Pressable,
  Spinner,
  Text,
  View,
} from '~/components/common/common';

import { styles } from './styles';

type Props = {
  label: string;
  icon?: IconName;
  variant?: ButtonVariant;
  onPress: () => void;
  style?: ViewStyle;
  isLoading?: boolean;
  loaderColor?: string;
};

const Button: FC<Props> = ({
  label,
  icon,
  variant,
  onPress,
  style,
  isLoading,
  loaderColor,
}) => {
  const textMarginLeft = icon ? 10 : 0;

  return (
    <Pressable
      style={[
        styles.button,
        styles[`button${variant}`],
        isLoading && styles.loaderButton,
        style,
      ]}
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
      {!isLoading ? (
        <Text
          style={{
            ...styles.label,
            ...styles[`button${variant}Label`],
            marginLeft: textMarginLeft,
          }}
        >
          {label}
        </Text>
      ) : (
        <View style={styles.loaderWrapper}>
          <View style={styles.loader}>
            <Spinner color={loaderColor} />
          </View>
          <Text
            style={{
              ...styles.label,
              ...styles[`button${variant}Label`],
              marginLeft: textMarginLeft,
            }}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export { Button };
