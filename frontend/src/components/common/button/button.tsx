import { FC } from 'common/types/types';
import styles from './button.module.scss';

type Props = {
  label: string;
  type?: 'button' | 'submit';
  isDisabled?: boolean;
};

const Button: FC<Props> = ({ type = 'button', label, isDisabled = false }) => (
  <button type={type} disabled={isDisabled} className={styles.button}>
    {label}
  </button>
);

export { Button };
