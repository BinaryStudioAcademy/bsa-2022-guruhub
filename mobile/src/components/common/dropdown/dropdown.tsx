import React, { Dispatch, PropsWithoutRef, ReactElement } from 'react';
import DropDownPicker, {
  ItemType,
  ThemeNameType,
} from 'react-native-dropdown-picker';

import { AppColor } from '~/common/enums/enums';
import { CategoryGetAllItemResponseDto } from '~/common/types/types';

type SetStateCallback<S> = (prevState: S) => S;

type SetStateValue<S> = (prevState: S) => S;

type Props<T> = {
  items: ItemType<T>[] & CategoryGetAllItemResponseDto[];
  open: boolean;
  value: T | null;
  setOpen: Dispatch<SetStateValue<boolean>>;
  setItems?: Dispatch<SetStateCallback<CategoryGetAllItemResponseDto[]>>;
  setValue: Dispatch<SetStateCallback<T | null>>;
  onChangeValue?: (value: T | null) => void;
  theme?: ThemeNameType;
  maxHeight?: number;
};

const Dropdown = <T extends string | number | boolean>({
  value,
  open,
  items,
  setOpen,
  setValue,
  setItems,
  onChangeValue,
  maxHeight = 400,
}: PropsWithoutRef<Props<T>>): ReactElement => {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={onChangeValue}
      theme="DARK"
      closeOnBackPressed={true}
      placeholder="Select category"
      placeholderStyle={{
        color: 'white',
        fontWeight: 'bold',
      }}
      searchPlaceholder="Search..."
      maxHeight={maxHeight}
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
