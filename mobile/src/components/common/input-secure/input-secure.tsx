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
  const [isContentVisible, setIsContentVisible] = useState(true);

  const handleContentVisabilityToggle = (): void => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <View>
      <Input
        label={label}
        name={name}
        control={control}
        errors={errors}
        placeholder={placeholder}
        isSecure={isContentVisible}
        isSecurePadding
      />
      <Pressable style={styles.button} onPress={handleContentVisabilityToggle}>
        <Icon
          name={isContentVisible ? 'visibilityOff' : 'visibility'}
          color={AppColor.TEXT.GRAY_200}
          width={24}
          height={24}
        />
      </Pressable>
    </View>
  );
};

export { InputSecure };
