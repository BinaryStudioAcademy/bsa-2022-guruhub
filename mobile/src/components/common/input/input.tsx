import React, { ReactElement } from 'react';
import { TextInput } from 'react-native';

import { AppColor } from '~/common/enums/enums';
import {
  FormControl,
  FormControlErrors,
  FormControlPath,
  FormControlValues,
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
};

const Input = <T extends FormControlValues>({
  label,
  name,
  control,
  errors,
  placeholder,
}: Props<T>): ReactElement => {
  const { field } = useFormControl({ name, control });

  const { value, onChange, onBlur } = field;
  const error = errors[name]?.message as string;

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={AppColor.TEXT.GRAY_200}
        onChangeText={onChange}
        onBlur={onBlur}
        style={styles.input}
      />
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export { Input };
