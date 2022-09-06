import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

import { FC, FormControl, FormControlPath } from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import DatePicker from 'react-datepicker';

import styles from './styles.module.scss';

type Props = {
  control: FormControl;
  name: FormControlPath;
  label: string;
  maxDate: Date;
  placeholder?: string;
};

const Datepicker: FC<Props> = ({
  control,
  name,
  label,
  placeholder,
  maxDate,
}) => {
  const { field } = useFormControl({ name, control });

  const handleChange = (date: Date | null): void => {
    field.onChange(date);
  };

  const handleDayClassNameGet = (): string => styles.datePickerDay;

  return (
    <div className={styles.dateWrapper}>
      <span className={styles.bdLabel}>{label}</span>
      <DatePicker
        selected={field.value ? new Date(field.value) : null}
        onChange={handleChange}
        className={styles.datePickerInput}
        calendarClassName={styles.datePicker}
        dayClassName={handleDayClassNameGet}
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        dateFormat="dd.MM.yyyy"
        maxDate={maxDate}
        placeholderText={placeholder}
      />
    </div>
  );
};

export { Datepicker };
