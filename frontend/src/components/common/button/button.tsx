import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  label: string;
  type?: 'button' | 'submit';
  inversedStyles?: boolean;
  onClick?: () => void;
};

const Button: FC<Props> = ({
  type = 'button',
  inversedStyles = false,
  label,
  onClick,
}) => (
  <button
    type={type}
    className={
      inversedStyles
        ? getValidClasses(styles.button, styles.inversedStyles)
        : styles.button
    }
    onClick={onClick}
  >
    {label}
  </button>
);

export { Button };
