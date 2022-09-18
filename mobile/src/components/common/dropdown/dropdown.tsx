import React, { ReactElement } from 'react';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';

import {
  FormControl,
  FormControlErrors,
  FormControlPath,
  FormControlValues,
} from '~/common/types/types';
import { Text } from '~/components/common/common';
import { useFormControl, useState } from '~/hooks/hooks';

import { styles } from './styles';

type Props<T> = {
  items: ItemType<string | number>[];
  control: FormControl<T>;
  name: FormControlPath<T>;
  label?: string;
  onSelectItem?: () => void;
  errors: FormControlErrors<T>;
  placeholder: string;
};

const Dropdown = <T extends FormControlValues>({
  items,
  name,
  label,
  control,
  onSelectItem,
  errors,
  placeholder,
}: Props<T>): ReactElement => {
  const [open, setOpen] = useState(false);
  const { field } = useFormControl({ name, control });
  const { value, onChange } = field;
  const error = errors[name]?.message;

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <DropDownPicker
        open={open}
        value={value}
        items={[...items]}
        setOpen={setOpen}
        setValue={onChange}
        onChangeValue={onChange}
        onSelectItem={onSelectItem}
        theme="DARK"
        closeOnBackPressed={true}
        placeholder={placeholder}
        placeholderStyle={styles.placeholderStyle}
        searchPlaceholder="Search..."
        autoScroll={true}
        searchable={true}
        listMode="MODAL"
        style={styles.dropDown}
        textStyle={styles.textStyle}
        modalContentContainerStyle={styles.modalContentContainerStyle}
        searchContainerStyle={styles.searchContainerStyle}
        searchTextInputStyle={styles.searchTextInputStyle}
        searchPlaceholderTextColor={styles.placeholderStyle.color}
        listItemContainerStyle={styles.listItemContainerStyle}
        listItemLabelStyle={styles.listItemLabelStyle}
      />
      {Boolean(error) && <Text style={styles.error}>{placeholder}</Text>}
    </>
  );
};

export { Dropdown };
