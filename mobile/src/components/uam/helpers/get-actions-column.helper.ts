import { TableColumn } from '~/common/types/ui/ui';

import { UserTableActionAccessor } from '../common/enums/enums';
import { UsersActionTableData } from '../common/types/types';

const getActionsColumn = (): TableColumn<UsersActionTableData>[] => {
  return [
    {
      header: 'Actions',
      accessor: UserTableActionAccessor.ACTION,
    },
  ];
};

export { getActionsColumn };
