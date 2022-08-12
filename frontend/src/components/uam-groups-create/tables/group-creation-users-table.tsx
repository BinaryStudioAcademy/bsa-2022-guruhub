import {
  FC,
  FormControl,
  FormControlErrors,
  UsersGetAllItemResponseDto,
} from 'common/types/types';
import { Table } from 'components/common/common';

import {
  getGroupCreationUserColumns,
  getGroupCreationUserRows,
} from '../helpers/helpers';
import styles from '../styles.module.scss';

type Props = {
  users: UsersGetAllItemResponseDto[];
  useFormData: {
    control: FormControl;
    errors: FormControlErrors;
  };
};

const GroupCreationUsersTable: FC<Props> = ({ users, useFormData }) => {
  const userRows = getGroupCreationUserRows(users, useFormData);
  const userColumns = getGroupCreationUserColumns();

  return (
    <div className={styles.groupWorkers}>
      <h5 className={styles.groupSubHeading}>
        Add workers to the Group - Optional
      </h5>
      <Table data={userRows} columns={userColumns} />
      <span className={styles.groupWorkersAmount}>{users.length} results</span>
    </div>
  );
};

export { GroupCreationUsersTable };
