import { FormControlPath } from 'common/types/types';
import { UserTableAccessor } from 'components/uam/common/enums/user-table-accessor.enum';
import {
  GroupConfigureUsersTableActionsProps,
  GroupConfigureUsersTableRow,
} from 'components/uam-configure-group/common/types/types';
import {
  DateCell,
  UserActionCell,
} from 'components/uam-configure-group/components/components';
import { IdCell } from 'components/uam-configure-group/components/users-table/components/components';
import { Column } from 'react-table';

type UseFormRegisterEntities = {
  name: FormControlPath;
  onCheckboxToggle: (value: number) => void;
  selectedUserIds: number[];
};

const getUserColumns = ({
  name,
  onCheckboxToggle,
  selectedUserIds,
}: UseFormRegisterEntities): Column<GroupConfigureUsersTableRow>[] => {
  return [
    {
      Header: 'Select',
      accessor: ({ id }): GroupConfigureUsersTableActionsProps => ({
        name,
        onToggle: () => onCheckboxToggle(id),
        isChecked: selectedUserIds.includes(id),
      }),
      Cell: UserActionCell,
      width: 90,
      minWidth: 90,
    },
    {
      Header: 'Name',
      accessor: UserTableAccessor.FULL_NAME,
      minWidth: 90,
    },
    {
      Header: 'Email',
      accessor: UserTableAccessor.EMAIL,
      minWidth: 80,
    },
    {
      Header: 'Created',
      accessor: UserTableAccessor.CREATED_AT,
      Cell: DateCell,
      minWidth: 100,
    },
    {
      Header: 'User ID',
      accessor: UserTableAccessor.ID,
      Cell: IdCell,
      width: 110,
      minWidth: 110,
    },
  ];
};

export { getUserColumns };
