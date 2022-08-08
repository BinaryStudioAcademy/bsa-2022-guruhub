import { FC } from 'common/types/types';
import styles from './button.module.scss';

type Props = {
  label: string;
  type?: 'button' | 'submit';
  isDisabled?: boolean;
};

const Button: FC<Props> = ({ type = 'button', label, isDisabled = false }) => (
  <button className={styles.button} type={type} disabled={isDisabled}>
    {label}
  </button>
);

export { Button };
