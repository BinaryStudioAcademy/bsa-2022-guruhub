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

import { DATE_SETTING } from './common/constants';
import { styles } from './styles';

type Props<T> = {
  label: string;
  name: FormControlPath<T>;
  control: FormControl<T>;
  errors: FormControlErrors<T>;
};

const DatePicker = <T extends FormControlValues>({
  label,
  name,
  control,
  errors,
}: Props<T>): ReactElement => {
  const [show, setShow] = useState(false);
  const { field } = useFormControl({ name, control });

  const { value, onChange } = field;
  const error = errors[name]?.message as string;

  const date = value
    ? getFormattedDate(value, 'dd.MM.yyyy')
    : 'Not assigned yet';
  const today = new Date();
  const maximumDate = new Date(
    today.getFullYear() - DATE_SETTING.minFullYear,
    today.getMonth(),
    today.getDay(),
  );
  const minimumDate = new Date(
    today.getFullYear() - DATE_SETTING.maxFullYear,
    today.getMonth(),
    today.getDay(),
  );

  const handleOnChange = (
    _event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ): void => {
    setShow(false);
    onChange(selectedDate);
  };

  const showDatepicker = (): void => {
    setShow(true);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.date} onPress={showDatepicker}>
        <Text style={styles.dateLabel}>{date}</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          onChange={handleOnChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export { DatePicker };
