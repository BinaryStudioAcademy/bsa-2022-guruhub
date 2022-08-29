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
    },
    {
      Header: 'Name',
      accessor: UserTableAccessor.FULL_NAME,
    },
    {
      Header: 'Email',
      accessor: UserTableAccessor.EMAIL,
    },
    {
      Header: 'Created',
      accessor: UserTableAccessor.CREATED_AT,
      Cell: DateCell,
    },
    {
      Header: 'User ID',
      accessor: UserTableAccessor.ID,
    },
  ];
};

export { getUserColumns };
