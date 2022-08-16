import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/dom/get-valid-classes/get-valid-classes.helper';

import styles from './styles.module.scss';

type Props = {
  label: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  classes?: string;
};

const Button: FC<Props> = ({ type = 'button', label, onClick, classes }) => (
  <button
    type={type}
    className={getValidClasses(classes, styles.button)}
    onClick={onClick}
  >
    {label}
  </button>
);

export { Button };
