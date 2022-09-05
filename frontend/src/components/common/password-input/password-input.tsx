import {
  FC,
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';
import { IconButton, Input } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';
import { useState } from 'hooks/hooks';

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
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  const handleClick = (): void => setIsPasswordHidden(!isPasswordHidden);

  return (
    <div className={getValidClasses(styles.passwordField)}>
      <Input
        type={isPasswordHidden ? 'password' : 'text'}
        label={label}
        name={name}
        control={control}
        errors={errors}
        placeholder={placeholder}
      />
      <IconButton
        label={isPasswordHidden ? 'Show password' : 'Hide password'}
        iconName={isPasswordHidden ? 'hidePass' : 'showPass'}
        className={styles.passwordIcon}
        onClick={handleClick}
      />
    </div>
  );
};

export { PasswordInput };
