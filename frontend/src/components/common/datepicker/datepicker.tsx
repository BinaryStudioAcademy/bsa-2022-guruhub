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
};

const Datepicker: FC<Props> = ({ control, name, label, errors }) => {
  const { field } = useFormControl({ name, control });

  const handleChange = (date: Date | null): void => {
    field.onChange(date);
  };

  const getDayClassName = (): string => styles.datePickerDay;

  return (
    <div className={styles.dateWrapper}>
      <span className={styles.bdLabel}>{label}</span>
      <DatePicker
        selected={field.value}
        onChange={handleChange}
        className={styles.datePickerInput}
        calendarClassName={styles.datePicker}
        dayClassName={getDayClassName}
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
      />
      <span className={styles.errorMessage}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

export { Datepicker };
