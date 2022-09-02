import 'react-datepicker/dist/react-datepicker.css';

import {
  FC,
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';
import { ErrorMessage } from 'components/common/common';
import { useFormControl } from 'hooks/hooks';
import DatePicker from 'react-datepicker';

import styles from './styles.module.scss';

type Props = {
  control: FormControl;
  errors: FormControlErrors;
  name: FormControlPath;
  label: string;
  placeholder?: string;
};

const Datepicker: FC<Props> = ({
  control,
  name,
  label,
  errors,
  placeholder,
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
        placeholderText={placeholder}
      />
      <span className={styles.errorMessage}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

export { Datepicker };
