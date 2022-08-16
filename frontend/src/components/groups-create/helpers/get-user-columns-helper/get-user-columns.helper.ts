import { FormControlPath } from 'common/types/types';
import {
  GroupCreationUsersTableActionsProps,
  GroupCreationUsersTableRow,
} from 'components/groups-create/common/types/types';
import { UserActionCell } from 'components/groups-create/components/components';
import { UserTableAccessor } from 'components/uam/common/enums/user-table-accessor.enum';
import { Column } from 'react-table';

type UseFormRegisterEntities = {
  name: FormControlPath;
  onCheckboxToggle: (value: number) => void;
};

const getUserColumns = ({
  name,
  onCheckboxToggle,
}: UseFormRegisterEntities): Column<GroupCreationUsersTableRow>[] => {
  return [
    {
      Header: 'Select',
      accessor: ({ id }): GroupCreationUsersTableActionsProps => ({
        name,
        onToggle: () => onCheckboxToggle(id),
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
      Header: 'User ID',
      accessor: UserTableAccessor.ID,
    },
  ];
};

export { getUserColumns };
