import {
  FC,
  FormControl,
  FormControlErrors,
  FormControlRegister,
  PermissionGetAllItemResponseDto,
} from 'common/types/types';
import { ErrorMessage, Table } from 'components/common/common';

import { GroupCreationFieldsName } from '../../common/enums/enums';
import {
  getPermissionsColumns,
  getPermissionsRows,
} from '../../helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  permissions: PermissionGetAllItemResponseDto[];
  useFormData: {
    register: FormControlRegister;
    control: FormControl;
    errors: FormControlErrors;
  };
};

const PermissionsTable: FC<Props> = ({ permissions, useFormData }) => {
  const permissionColumns = getPermissionsColumns();
  const permissionRows = getPermissionsRows(permissions, useFormData);

  return (
    <div className={styles.groupPermissions}>
      <h5 className={styles.groupSubHeading}>Attach permissions policies</h5>
      <span className={styles.errorMessage}>
        <ErrorMessage
          errors={useFormData.errors}
          name={GroupCreationFieldsName.PERMISSION_IDS}
        />
      </span>
      <Table data={permissionRows} columns={permissionColumns} />
    </div>
  );
};

export { PermissionsTable };
