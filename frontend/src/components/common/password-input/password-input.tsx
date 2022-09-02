import hideIcon from 'assets/icons/hidden-password.svg';
import showIcon from 'assets/icons/shown-password.svg';
import { FC, FormControl, FormControlPath } from 'common/types/types';
import { Image } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';
import { useFormControl, useState } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  control: FormControl;
  name: FormControlPath;
  inputClassName: string;
  placeholder?: string;
};

const PasswordInput: FC<Props> = ({
  control,
  name,
  placeholder,
  inputClassName,
}) => {
  const { field } = useFormControl({ name, control });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleClick = (): void => setIsPasswordHidden(!isPasswordHidden);

  return (
    <>
      <input
        {...field}
        type={isPasswordHidden ? 'password' : 'text'}
        className={getValidClasses(inputClassName)}
        placeholder={placeholder}
      />
      <Image
        src={isPasswordHidden ? hideIcon : showIcon}
        alt="show password"
        width="17"
        height="15"
        classes={styles.passwordIcon}
        onClick={handleClick}
      />
    </>
  );
};

export { PasswordInput };
