import UICheckBox from '@react-native-community/checkbox';
import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { AppColor } from '~/common/enums/enums';
import {
  FormControl,
  FormControlPath,
  FormControlValues,
} from '~/common/types/types';
import { useFormControl } from '~/hooks/hooks';

import { styles } from './styles';

type Props<T extends FormControlValues> = {
  name: FormControlPath<T>;
  control: FormControl<T>;
  onCheckbox: () => void;
};

const Checkbox = <T extends FormControlValues>({
  name,
  control,
  onCheckbox,
}: Props<T>): ReactElement => {
  const { field } = useFormControl({ name, control });
  const { value, onChange } = field;

  const handleToggle = (e: boolean): void => {
    onChange(e);
    onCheckbox();
  };

  return (
    <View style={styles.container}>
      <UICheckBox
        value={value}
        onValueChange={handleToggle}
        tintColors={{
          true: AppColor.BRAND.BLUE_100,
          false: AppColor.BRAND.BLUE_100,
        }}
      />
    </View>
  );
};

export { Checkbox };
