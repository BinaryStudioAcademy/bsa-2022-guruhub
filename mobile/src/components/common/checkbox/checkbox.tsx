import UICheckBox from '@react-native-community/checkbox';
import React, { ReactElement } from 'react';

import { AppColor } from '~/common/enums/enums';
import {
  FormControl,
  FormControlPath,
  FormControlValues,
} from '~/common/types/types';
import { View } from '~/components/common/common';
import { useFormControl } from '~/hooks/hooks';

import { styles } from './styles';

type Props<T extends FormControlValues> = {
  name: FormControlPath<T>;
  control: FormControl<T>;
  onToggle: () => void;
};

const Checkbox = <T extends FormControlValues>({
  name,
  control,
  onToggle,
}: Props<T>): ReactElement => {
  const { field } = useFormControl({ name, control });
  const { value, onChange } = field;

  const handleToggle = (e: boolean): void => {
    onChange(e);
    onToggle();
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
