import { FormControlPath } from 'common/types/types';
import { UserTableAccessor } from 'components/uam/common/enums/user-table-accessor.enum';
import {
  GroupConfigurateUsersTableActionsProps,
  GroupConfigurateUsersTableRow,
} from 'components/uam-configurate-group/common/types/types';
import { UserActionCell } from 'components/uam-configurate-group/components/components';
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
}: UseFormRegisterEntities): Column<GroupConfigurateUsersTableRow>[] => {
  return [
    {
      Header: 'Select',
      accessor: ({ id }): GroupConfigurateUsersTableActionsProps => ({
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
      Header: 'User ID',
      accessor: UserTableAccessor.ID,
    },
  ];
};

export { getUserColumns };
