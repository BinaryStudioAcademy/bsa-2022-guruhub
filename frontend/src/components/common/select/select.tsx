import {
  FC,
  FormControl,
  FormControlErrors,
  SelectorOption,
  SelectStyles,
} from 'common/types/types';
import { ErrorMessage } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';
import { useFormControl } from 'hooks/hooks';
import ReactSelect, { SingleValue } from 'react-select';

import { DEFAULT_SELECT_STYLES } from './styles';
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
  stylingProps?: SelectStyles;
};

const Select: FC<Props> = ({
  name,
  control,
  errors,
  label,
  hasVisuallyHiddenLabel = false,
  options,
  className,
  stylingProps = DEFAULT_SELECT_STYLES,
}) => {
  const { field } = useFormControl({ name, control });

  const handleOptionValue = (
    value: string,
  ): SelectorOption<string | number> | undefined => {
    return options.find((c) => c.value === value);
  };

  const handleChange = (
    val: SingleValue<SelectorOption<string | number>>,
  ): void => field.onChange(val?.value);

  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  return (
    <div
      className={getValidClasses(className, styles.wrapper)}
      onClick={handleClick}
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
        defaultValue={handleOptionValue(String(field.value))}
        value={handleOptionValue(field.value)}
        onChange={handleChange}
        name={name}
        isSearchable={true}
        className={styles.select}
        styles={stylingProps}
      />
      <span className={styles.errorMessage}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

export { Select };
