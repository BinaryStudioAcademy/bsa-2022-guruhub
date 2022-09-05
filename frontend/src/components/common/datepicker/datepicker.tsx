import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

import { FC, FormControl, FormControlPath } from 'common/types/types';
import { subYears } from 'date-fns';
import { useFormControl } from 'hooks/hooks';
import DatePicker from 'react-datepicker';

import { MIN_USER_AGE } from './common/constants';
import styles from './styles.module.scss';

type Props = {
  control: FormControl;
  name: FormControlPath;
  label: string;
  placeholder?: string;
};

const Datepicker: FC<Props> = ({ control, name, label, placeholder }) => {
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
        maxDate={subYears(new Date(), MIN_USER_AGE)}
        placeholderText={placeholder}
      />
    </div>
  );
};

export { Datepicker };
