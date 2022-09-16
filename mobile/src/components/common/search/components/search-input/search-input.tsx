import React, { ReactElement } from 'react';
import { TextInput } from 'react-native';

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
  onFocus: () => void;
  onBlur: () => void;
  onChange: () => void;
};

const SearchInput = <T extends FormControlValues>({
  name,
  control,
  onFocus,
  onBlur,
  onChange,
}: Props<T>): ReactElement => {
  const { field } = useFormControl({ name, control });

  const { value } = field;

  return (
    <TextInput
      selectionColor={AppColor.TEXT.GRAY_200}
      style={styles.search}
      onFocus={onFocus}
      onBlur={onBlur}
      autoComplete="off"
      autoCorrect={false}
      onChangeText={onChange}
      placeholder="Search"
      placeholderTextColor={AppColor.TEXT.GRAY_200}
      value={value}
    />
  );
};

export { SearchInput };
