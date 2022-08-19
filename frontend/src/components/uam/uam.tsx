import { FC } from 'common/types/types';

import { GroupsTable, UsersTable } from './components/components';
import styles from './styles.module.scss';

const UAM: FC = () => {
  return (
    <div className={styles.uam}>
      <h1 className={styles.pageTitle}>User Access Management</h1>
      <UsersTable />
      <GroupsTable />
    </div>
  );
};

export { UAM };
