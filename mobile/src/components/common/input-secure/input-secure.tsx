import React, { ReactElement } from 'react';
import { TextInput } from 'react-native';

import { AppColor } from '~/common/enums/enums';
import {
  FormControl,
  FormControlErrors,
  FormControlPath,
  FormControlValues,
} from '~/common/types/types';
import { Icon, Pressable, Text, View } from '~/components/common/common';
import { useFormControl, useState } from '~/hooks/hooks';

import { styles } from './styles';

type Props<T extends FormControlValues> = {
  label: string;
  name: FormControlPath<T>;
  control: FormControl<T>;
  errors: FormControlErrors<T>;
  placeholder?: string;
};

const InputSecure = <T extends FormControlValues>({
  label,
  name,
  control,
  errors,
  placeholder,
}: Props<T>): ReactElement => {
  const { field } = useFormControl({ name, control });
  const [visibility, setVisibility] = useState(true);

  const { value, onChange, onBlur } = field;
  const error = errors[name]?.message as string;

  const handleOnPress = (): void => {
    setVisibility(!visibility);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View>
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={AppColor.TEXT.GRAY_200}
          onChangeText={onChange}
          onBlur={onBlur}
          style={styles.input}
          secureTextEntry={visibility}
        />
        <Pressable style={styles.button} onPress={handleOnPress}>
          <Icon
            name={!visibility ? 'visibility' : 'visibilityOff'}
            color={AppColor.TEXT.GRAY_200}
            width={24}
            height={24}
          />
        </Pressable>
      </View>
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export { InputSecure };
