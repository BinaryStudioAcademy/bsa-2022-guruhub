import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  label: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
};

const Button: FC<Props> = ({ type = 'button', label, onClick, className }) => (
  <button
    type={type}
    className={getValidClasses(className ? styles[className] : styles.button)}
    onClick={onClick}
  >
    {label}
  </button>
);

export { Button };
