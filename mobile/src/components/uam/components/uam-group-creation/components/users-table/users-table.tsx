import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { UsersGetResponseDto } from '~/common/types/types';
import { Pagination, Table, View } from '~/components/common/common';
import {
  getUserColumns,
  getUserRows,
} from '~/components/uam/components/uam-group-creation/helpers/helpers';
import { useAppForm } from '~/hooks/hooks';

import { styles } from './styles';

type Props = {
  users: {
    items: UsersGetResponseDto[];
    total: number;
  };
  onCheckbox: (id: number) => void;
  pagination: {
    page: number;
    setPage: (page: number) => void;
  };
};

const GroupCreationUsersTable: FC<Props> = ({
  users,
  onCheckbox,
  pagination,
}) => {
  const { control } = useAppForm({ defaultValues: {} });
  const userRows = getUserRows({ users: users.items, onCheckbox, control });
  const userColumns = getUserColumns();
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Table
        columns={userColumns}
        data={userRows}
        columnWidthArr={[width * 0.1, width * 0.3, width * 0.4, width * 0.1]}
      />
      <Pagination
        totalCount={users.total}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        currentPage={pagination.page}
        onPageChange={pagination.setPage}
      />
    </View>
  );
};

export { GroupCreationUsersTable };
