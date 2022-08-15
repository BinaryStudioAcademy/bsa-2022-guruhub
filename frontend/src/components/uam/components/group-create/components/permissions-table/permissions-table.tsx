import {
  FC,
  FormControl,
  FormControlErrors,
  FormControlRegister,
  PermissionsGetAllItemResponseDto,
} from 'common/types/types';
import { ErrorMessage, Table } from 'components/common/common';
import { PermissionsTableRow } from 'components/uam/common/types/types';
import { useMemo } from 'hooks/hooks';
import { Column } from 'react-table';

import { GroupCreationFieldsName } from '../../common/enums/enums';
import { getPermissionsColumns } from '../../helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  permissions: PermissionsGetAllItemResponseDto[];
  useFormData: {
    register: FormControlRegister;
    control: FormControl;
    errors: FormControlErrors;
  };
};

const PermissionsTable: FC<Props> = ({ permissions, useFormData }) => {
  const columns = useMemo<Column<PermissionsTableRow>[]>(() => {
    return getPermissionsColumns(useFormData.control, {
      register: useFormData.register,
      name: GroupCreationFieldsName.PERMISSION_IDS,
    });
  }, []);

  return (
    <div className={styles.groupPermissions}>
      <p className={styles.groupSubHeading}>Attach permissions policies</p>
      <span className={styles.errorMessage}>
        <ErrorMessage
          errors={useFormData.errors}
          name={GroupCreationFieldsName.PERMISSION_IDS}
        />
      </span>
      <Table data={permissions} columns={columns} />
    </div>
  );
};

export { PermissionsTable };
