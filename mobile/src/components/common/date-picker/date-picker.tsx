import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { ReactElement } from 'react';

import {
  FormControl,
  FormControlErrors,
  FormControlPath,
  FormControlValues,
} from '~/common/types/types';
import { Pressable, Text, View } from '~/components/common/common';
import { getFormattedDate } from '~/helpers/helpers';
import { useFormControl, useState } from '~/hooks/hooks';

import { styles } from './styles';

type Props<T> = {
  label: string;
  name: FormControlPath<T>;
  control: FormControl<T>;
  errors: FormControlErrors<T>;
  maximumDate?: number;
  minimumDate?: number;
  placeholder?: string;
};

const DatePicker = <T extends FormControlValues>({
  label,
  name,
  control,
  errors,
  maximumDate,
  minimumDate,
  placeholder,
}: Props<T>): ReactElement => {
  const [isDatePickerShown, setIsDatePickerShown] = useState(false);
  const { field } = useFormControl({ name, control });

  const { value, onChange } = field;
  const error = errors[name]?.message as string;

  const datePlaceholder = placeholder ?? '';
  const date = value ? getFormattedDate(value, 'dd.MM.yyyy') : datePlaceholder;
  const today = new Date();
  const maxDate = maximumDate
    ? new Date(
        today.getFullYear() - maximumDate,
        today.getMonth(),
        today.getDay(),
      )
    : undefined;
  const minDate = minimumDate
    ? new Date(
        today.getFullYear() - minimumDate,
        today.getMonth(),
        today.getDay(),
      )
    : undefined;

  const handleOnChange = (
    _event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ): void => {
    setIsDatePickerShown(false);
    onChange(selectedDate);
  };

  const handleDatePickerOpen = (): void => {
    setIsDatePickerShown(true);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.date} onPress={handleDatePickerOpen}>
        <Text style={styles.dateLabel}>{date}</Text>
      </Pressable>
      {isDatePickerShown && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          onChange={handleOnChange}
          maximumDate={maxDate}
          minimumDate={minDate}
        />
      )}
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export { DatePicker };
