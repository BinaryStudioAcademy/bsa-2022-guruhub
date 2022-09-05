import { UserValidationRule } from 'common/enums/enums';
import {
  FC,
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';
import { ErrorMessage, IconButton } from 'components/common/common';
import defaultInputStyles from 'components/common/input/styles.module.scss';
import { getValidClasses } from 'helpers/helpers';
import { useFormControl, useState } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  label: string;
  control: FormControl;
  name: FormControlPath;
  errors: FormControlErrors;
  placeholder?: string;
};

const PasswordInput: FC<Props> = ({
  label,
  control,
  name,
  errors,
  placeholder,
}) => {
  const { field } = useFormControl({ name, control });
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  const handleClick = (): void => setIsPasswordHidden(!isPasswordHidden);

  return (
    <label
      className={getValidClasses(
        defaultInputStyles.label,
        styles.passwordField,
      )}
    >
      <span className={getValidClasses(defaultInputStyles.title)}>{label}</span>
      <input
        {...field}
        type={isPasswordHidden ? 'password' : 'text'}
        className={getValidClasses(defaultInputStyles.input)}
        maxLength={UserValidationRule.PASSWORD_MAX_LENGTH}
        placeholder={placeholder}
      />
      <IconButton
        label={isPasswordHidden ? 'Show password' : 'Hide password'}
        iconName={isPasswordHidden ? 'hidePass' : 'showPass'}
        className={styles.passwordIcon}
        onClick={handleClick}
      />
      <span className={defaultInputStyles.errorMessage}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export { PasswordInput };
