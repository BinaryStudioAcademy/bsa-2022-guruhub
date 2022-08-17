import { FC } from 'common/types/types';

import styles from './styles.module.scss';

type Props = {
  placeholder: string;
};

const TablePlaceholder: FC<Props> = ({ placeholder }) => {
  return <p className={styles.placeholder}>{placeholder}</p>;
};

export { TablePlaceholder };
