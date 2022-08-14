import { FC, FormControl, FormControlErrors } from 'common/types/types';
import { Table } from 'components/common/common';
import { PermissionsGetAllItemResponseDto } from 'guruhub-shared/common/types/permission/permission-item-response-dto.type';

import {
  getPermissionsColumns,
  getPermissionsRows,
} from '../../helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  permissions: PermissionsGetAllItemResponseDto[];
  useFormData: {
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
      <Table data={permissionRows} columns={permissionColumns} />
    </div>
  );
};

export { PermissionsTable };
