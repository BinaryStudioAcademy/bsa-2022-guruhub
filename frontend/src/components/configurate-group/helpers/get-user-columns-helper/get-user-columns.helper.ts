import { FormControlPath } from 'common/types/types';
import {
  GroupConfigurateUsersTableActionsProps,
  GroupConfigurateUsersTableRow,
} from 'components/configurate-group/common/types/types';
import { UserActionCell } from 'components/configurate-group/components/components';
import { UserTableAccessor } from 'components/uam/common/enums/user-table-accessor.enum';
import { Column } from 'react-table';

type UseFormRegisterEntities = {
  name: FormControlPath;
  onCheckboxToggle: (value: number) => void;
  defaultSelectedUserIds?: number[];
};

const getUserColumns = ({
  name,
  onCheckboxToggle,
  defaultSelectedUserIds = [],
}: UseFormRegisterEntities): Column<GroupConfigurateUsersTableRow>[] => {
  return [
    {
      Header: 'Select',
      accessor: ({ id }): GroupConfigurateUsersTableActionsProps => ({
        name,
        onToggle: () => onCheckboxToggle(id),
        isChecked: defaultSelectedUserIds?.includes(id),
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
