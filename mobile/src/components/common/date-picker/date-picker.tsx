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
  label?: string;
  name: FormControlPath<T>;
  control: FormControl<T>;
  errors: FormControlErrors<T>;
  maximumDate?: Date;
  minimumDate?: Date;
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
  const error = errors[name]?.message;

  const datePlaceholder = placeholder ?? '';
  const date = value ? getFormattedDate(value, 'dd.MM.yyyy') : datePlaceholder;

  const handleOnChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ): void => {
    setIsDatePickerShown(false);

    if (event.type === 'dismissed') {
      return;
    }

    if (event.type === 'neutralButtonPressed') {
      onChange(null);

      return;
    }

    onChange(selectedDate);
  };

  const handleDatePickerOpen = (): void => {
    setIsDatePickerShown(true);
  };

  return (
    <View>
      {Boolean(label) && <Text style={styles.label}>{label as string}</Text>}
      <Pressable style={styles.date} onPress={handleDatePickerOpen}>
        <Text style={styles.dateLabel}>{date}</Text>
      </Pressable>
      {isDatePickerShown && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          onChange={handleOnChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          neutralButtonLabel="clear"
        />
      )}
      {Boolean(error) && <Text style={styles.error}>{error as string}</Text>}
    </View>
  );
};

export { DatePicker };
