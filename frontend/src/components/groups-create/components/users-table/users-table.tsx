import {
  FC,
  FormControl,
  FormControlErrors,
  UsersGetResponseDto,
} from 'common/types/types';
import { Table } from 'components/common/common';
import { useMemo } from 'hooks/hooks';
import { Column } from 'react-table';

import { GroupCreationFieldsName } from '../../common/enums/enums';
import { GroupCreationUsersTableRow } from '../../common/types/types';
import { getUserColumns } from '../../helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  users: UsersGetResponseDto[];
  onCheckboxToggle: (value: number) => void;
  useFormData: {
    control: FormControl;
    errors: FormControlErrors;
  };
};

const UsersTable: FC<Props> = ({ users, onCheckboxToggle, useFormData }) => {
  const columns = useMemo<Column<GroupCreationUsersTableRow>[]>(() => {
    return getUserColumns(useFormData.control, {
      name: GroupCreationFieldsName.USER_IDS,
      errors: useFormData.errors,
      onCheckboxToggle,
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
