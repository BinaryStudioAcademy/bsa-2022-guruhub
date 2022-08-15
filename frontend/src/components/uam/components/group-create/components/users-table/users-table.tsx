import {
  FC,
  FormControl,
  FormControlErrors,
  FormControlRegister,
  UsersGetResponseDto,
} from 'common/types/types';
import { Table } from 'components/common/common';
import { GroupCreationUsersTableRow } from 'components/uam/common/types/types';
import { useMemo } from 'hooks/hooks';
import { Column } from 'react-table';

import { GroupCreationFieldsName } from '../../common/enums/enums';
import { getUserColumns } from '../../helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  users: UsersGetResponseDto[];
  useFormData: {
    register: FormControlRegister;
    control: FormControl;
    errors: FormControlErrors;
  };
};

const UsersTable: FC<Props> = ({ users, useFormData }) => {
  const columns = useMemo<Column<GroupCreationUsersTableRow>[]>(() => {
    return getUserColumns(useFormData.control, {
      name: GroupCreationFieldsName.USER_IDS,
      register: useFormData.register,
    });
  }, []);

  return (
    <div className={styles.groupWorkers}>
      <p className={styles.groupSubHeading}>
        Add workers to the Group - Optional
      </p>
      <Table data={users} columns={columns} />
      <span className={styles.groupWorkersAmount}>{users.length} results</span>
    </div>
  );
};

export { UsersTable };
