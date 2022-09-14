import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

import { FC, FormControl, FormControlPath } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';
import { useFormControl } from 'hooks/hooks';
import DatePicker from 'react-datepicker';

import styles from './styles.module.scss';

type Props = {
  control: FormControl;
  name: FormControlPath;
  label?: string;
  maxDate?: Date;
  minDate?: Date;
  placeholder?: string;
  selectedDate?: Date | string;
  withTime?: boolean;
  className?: string;
};

const Datepicker: FC<Props> = ({
  control,
  name,
  label,
  placeholder,
  maxDate,
  minDate,
  selectedDate,
  withTime,
  className,
}) => {
  const { field } = useFormControl({ name, control });

  const handleChange = (date: Date | null): void => {
    field.onChange(date);
  };

  const handleDayClassNameGet = (): string => styles.datePickerDay;

  return (
    <div className={styles.dateWrapper}>
      {label && <span className={styles.bdLabel}>{label}</span>}
      <DatePicker
        selected={
          field.value
            ? new Date(field.value)
            : selectedDate
            ? new Date(selectedDate)
            : null
        }
        onChange={handleChange}
        className={getValidClasses(styles.datePickerInput, className)}
        calendarClassName={styles.datePicker}
        dayClassName={handleDayClassNameGet}
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        dateFormat={withTime ? 'HH:mm dd.MM.yyyy' : 'dd.MM.yyyy'}
        maxDate={maxDate}
        minDate={minDate}
        placeholderText={placeholder}
        showTimeInput={withTime}
      />
    </div>
  );
};

export { Datepicker };
