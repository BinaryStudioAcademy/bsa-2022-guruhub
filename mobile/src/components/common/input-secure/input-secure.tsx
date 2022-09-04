import React, { ReactElement } from 'react';

import { AppColor } from '~/common/enums/enums';
import {
  FormControl,
  FormControlErrors,
  FormControlPath,
  FormControlValues,
} from '~/common/types/types';
import { Icon, Input, Pressable, View } from '~/components/common/common';
import { useState } from '~/hooks/hooks';

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
  const [visibility, setVisibility] = useState(true);

  const handleOnPress = (): void => {
    setVisibility(!visibility);
  };

  return (
    <View>
      <Input
        label={label}
        name={name}
        control={control}
        errors={errors}
        placeholder={placeholder}
        isSecure={visibility}
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
  );
};

export { InputSecure };
