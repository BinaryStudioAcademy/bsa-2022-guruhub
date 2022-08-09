import React, { ReactElement, useEffect, useState } from 'react';
import { TextInput, ViewStyle as UIViewStyle } from 'react-native';
import { AppColor } from '~/common/enums/enums';

import {
  FormControl,
  FormControlErrors,
  FormControlPath,
  FormControlValues,
  TextStyle,
} from '~/common/types/types';
import { Text, View } from '~/components/common/common';
import { useFormControl } from '~/hooks/hooks';

import { styles } from './styles';

type Props<T extends FormControlValues> = {
  label: string;
  name: FormControlPath<T>;
  control: FormControl<T>;
  errors: FormControlErrors<T>;
  placeholder?: string;
  labelStyle?: TextStyle;
  inputStyle?: UIViewStyle;
};

const Input = <T extends FormControlValues>({
  label,
  name,
  control,
  errors,
  placeholder,
  labelStyle,
  inputStyle,
}: Props<T>): ReactElement => {
  const { field } = useFormControl({ name, control });

  const { value, onChange, onBlur } = field;
  const error = errors[name]?.message as string;

  const [borderColor, setBorderColor] = useState('');

  useEffect(() => {
    if (error) {
      setBorderColor(AppColor.SUPPORT.ERROR_RED_100);
    } else if (!error && value) {
      setBorderColor(AppColor.BRAND.BLUE_100);
    } else {
      setBorderColor(AppColor.BACKGROUND.GRAY_300);
    }
  }, [error]);

  return (
    <View>
      <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={AppColor.TEXT.GRAY_200}
        onChangeText={onChange}
        onFocus={(): void | boolean =>
          !error && setBorderColor(AppColor.BRAND.BLUE_100)
        }
        onBlur={(): void | boolean => {
          !error && setBorderColor(AppColor.BACKGROUND.GRAY_300);
          onBlur;
        }}
        style={{ ...styles.input, ...inputStyle, borderColor }}
        secureTextEntry={true && name === 'password'}
      />
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export { Input };
