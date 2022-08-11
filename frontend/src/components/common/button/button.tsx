import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  label: string;
  color?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

const Button: FC<Props> = ({ type = 'button', label, color, onClick }) => (
  <button
    type={type}
    className={getValidClasses(
      styles.button,
      color && styles[`button__${color}`],
    )}
    color={color}
    onClick={onClick}
  >
    {label}
  </button>
);

export { Button };
