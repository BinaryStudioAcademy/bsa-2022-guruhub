import {
  FC,
  FormControl,
  FormControlErrors,
  SelectorOption,
} from 'common/types/types';
import { ErrorMessage } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';
import { useFormControl } from 'hooks/hooks';
import ReactSelect, { SingleValue } from 'react-select';

import styles from './styles.module.scss';

type Props = {
  control: FormControl;
  errors: FormControlErrors;
  name: string;
  options: SelectorOption<string | number>[];
  setValue?: (name: string, value: string) => void;
  value?: string;
  label: string;
  hasVisuallyHiddenLabel?: boolean;
  className?: string;
  defaultCategoryId?: number;
};

const Select: FC<Props> = ({
  name,
  control,
  errors,
  label,
  hasVisuallyHiddenLabel = false,
  options,
  className,
  defaultCategoryId,
}) => {
  const { field } = useFormControl({ name, control });

  const getOptionValue = (
    value: string,
  ): SelectorOption<string | number> | undefined => {
    return options.find((c) => c.value === value);
  };

  const onChange = (val: SingleValue<SelectorOption<string | number>>): void =>
    field.onChange(val?.value);

  return (
    <div
      className={getValidClasses(className, styles.wrapper)}
      onClick={(e: React.MouseEvent): void => {
        e.stopPropagation();
      }}
    >
      <label
        className={getValidClasses(
          styles.title,
          hasVisuallyHiddenLabel && 'visually-hidden',
        )}
      >
        {label}
      </label>
      <ReactSelect
        options={options}
        defaultValue={getOptionValue(String(defaultCategoryId))}
        value={getOptionValue(field.value)}
        onChange={onChange}
        name={name}
        isSearchable={false}
        className={styles.select}
      />
      <span className={styles.errorMessage}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

export { Select };
