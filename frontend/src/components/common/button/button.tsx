import { FC } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  label: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

const Button: FC<Props> = ({ type = 'button', label, onClick }) => (
  <button type={type} className={styles.button} onClick={onClick}>
    {label}
  </button>
);

export { Button };
