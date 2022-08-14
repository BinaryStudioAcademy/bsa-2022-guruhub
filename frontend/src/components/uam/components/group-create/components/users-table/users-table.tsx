import {
  FC,
  FormControl,
  FormControlErrors,
  FormControlRegister,
  UsersGetResponseDto,
} from 'common/types/types';
import { ErrorMessage, Table } from 'components/common/common';

import { GroupCreationFieldsName } from '../../common/enums/enums';
import { getUserColumns, getUserRows } from '../../helpers/helpers';
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
  const userRows = getUserRows(users, useFormData);
  const userColumns = getUserColumns();

  return (
    <div className={styles.groupWorkers}>
      <h5 className={styles.groupSubHeading}>
        Add workers to the Group - Optional
      </h5>
      <span className={styles.errorMessage}>
        <ErrorMessage
          errors={useFormData.errors}
          name={GroupCreationFieldsName.USER_IDS}
        />
      </span>
      <Table data={userRows} columns={userColumns} />
      <span className={styles.groupWorkersAmount}>{users.length} results</span>
    </div>
  );
};

export { UsersTable };
