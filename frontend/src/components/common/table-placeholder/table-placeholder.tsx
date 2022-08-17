import { ReactElement } from 'react';

import styles from './styles.module.scss';

const TablePlaceholder = (): ReactElement => {
  return <p className={styles.placeholder}>No data to display</p>;
};

export { TablePlaceholder };
