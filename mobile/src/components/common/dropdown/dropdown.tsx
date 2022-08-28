import React, { ReactElement } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import { AppColor } from '~/common/enums/enums';
import {
  FormControl,
  FormControlPath,
  FormControlValues,
} from '~/common/types/types';
import { useFormControl, useState } from '~/hooks/hooks';

type Props<T> = {
  items: T[];
  onSelectItem: (id: number) => void;
  control: FormControl<T>;
  name: FormControlPath<T>;
};

const Dropdown = <T extends FormControlValues>({
  items,
  name,
  onSelectItem,
  control,
}: Props<T>): ReactElement => {
  const [open, setOpen] = useState(false);
  const { field } = useFormControl({ name, control });
  const { value, onChange } = field;

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={onChange}
      onChangeValue={(id): void => {
        onChange(id);
        onSelectItem(id ?? 0);
      }}
      theme="DARK"
      closeOnBackPressed={true}
      placeholder="Select category"
      placeholderStyle={{
        color: 'white',
        fontWeight: 'bold',
      }}
      searchPlaceholder="Search..."
      autoScroll={true}
      labelStyle={{
        fontWeight: 'bold',
      }}
      searchable={true}
      schema={{
        label: 'name',
        value: 'id',
      }}
      listMode="MODAL"
      dropDownContainerStyle={{
        backgroundColor: 'white',
        height: 100,
      }}
      listParentContainerStyle={{
        backgroundColor: AppColor.BACKGROUND.GRAY_300,
      }}
      searchContainerStyle={{
        backgroundColor: AppColor.BACKGROUND.GRAY_300,
      }}
      searchTextInputStyle={{
        color: 'white',
      }}
      searchPlaceholderTextColor="white"
    />
  );
};

export { Dropdown };
