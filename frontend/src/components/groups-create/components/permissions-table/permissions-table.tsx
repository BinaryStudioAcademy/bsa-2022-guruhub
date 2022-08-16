import {
  FC,
  FormControl,
  FormControlErrors,
  PermissionsGetAllItemResponseDto,
} from 'common/types/types';
import { Table } from 'components/common/common';
import { useMemo } from 'hooks/hooks';
import { Column } from 'react-table';

import { GroupCreationFieldsName } from '../../common/enums/enums';
import { PermissionsTableRow } from '../../common/types/types';
import { getPermissionsColumns } from '../../helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  permissions: PermissionsGetAllItemResponseDto[];
  onCheckboxToggle: (value: number) => void;
  useFormData: {
    control: FormControl;
    errors: FormControlErrors;
  };
};

const PermissionsTable: FC<Props> = ({
  permissions,
  onCheckboxToggle,
  useFormData,
}) => {
  const columns = useMemo<Column<PermissionsTableRow>[]>(() => {
    return getPermissionsColumns(useFormData.control, {
      name: GroupCreationFieldsName.PERMISSION_IDS,
      errors: useFormData.errors,
      onCheckboxToggle,
    });
  }, []);

  return (
    <div className={styles.groupPermissions}>
      <p className={styles.groupSubHeading}>Attach permissions policies</p>
      <Table data={permissions} columns={columns} />
    </div>
  );
};

export { PermissionsTable };
