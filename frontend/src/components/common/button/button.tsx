import { FC } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  label: string;
  type?: 'button' | 'submit';
};

const Button: FC<Props> = ({ type = 'button', label }) => (
  <button type={type} className={styles.button}>
    {label}
  </button>
);

export { Button };
