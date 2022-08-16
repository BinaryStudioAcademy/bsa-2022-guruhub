import { ReactElement } from 'react';

import styles from './styles.module.scss';

const TablePlaceholder = (): ReactElement => {
  return <div className={styles.placeholder}>No data to display</div>;
};

export { TablePlaceholder };
