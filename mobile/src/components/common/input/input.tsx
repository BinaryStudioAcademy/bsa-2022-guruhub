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
  label?: string;
  name: FormControlPath<T>;
  control: FormControl<T>;
  errors: FormControlErrors<T>;
  placeholder?: string;
  isSecure?: boolean;
  isSecurePadding?: boolean;
  rows?: number;
  keyboardType?: 'default' | 'numeric';
};

const Input = <T extends FormControlValues>({
  label,
  name,
  control,
  errors,
  placeholder,
  isSecure,
  isSecurePadding,
  rows,
  keyboardType = 'default',
}: Props<T>): ReactElement => {
  const { field } = useFormControl({ name, control });

  const { value, onChange, onBlur } = field;
  const error = errors[name]?.message as string;
  const hasRows = Boolean(rows);
  const hasLabel = Boolean(label);

  return (
    <View>
      {hasLabel && <Text style={styles.label}>{label as string}</Text>}
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={AppColor.TEXT.GRAY_200}
        onChangeText={onChange}
        onBlur={onBlur}
        style={[
          styles.input,
          hasRows && styles.rows,
          isSecurePadding && styles.isSecure,
        ]}
        secureTextEntry={isSecure}
        numberOfLines={rows}
        multiline={hasRows}
        autoCorrect={false}
        keyboardType={keyboardType}
      />
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export { Input };
