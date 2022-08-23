import React, { FC } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { UsersGetResponseDto } from '~/common/types/types';
import { Pagination, Table, View } from '~/components/common/common';
import {
  getUserColumns,
  getUserRows,
} from '~/components/uam-configure-group/helpers/helpers';

import { styles } from './styles';

type Props = {
  users: {
    items: UsersGetResponseDto[];
    total: number;
  };
  onCheckboxToggle: (id: number) => void;
  pagination: {
    page: number;
    setPage: (page: number) => void;
  };
  checkedIds: number[];
};

const UsersTable: FC<Props> = ({
  users,
  onCheckboxToggle,
  pagination,
  checkedIds,
}) => {
  const userRows = getUserRows({
    users: users.items,
    onToggle: onCheckboxToggle,
    checkedUserIds: checkedIds,
  });
  const userColumns = getUserColumns();

  return (
    <View style={styles.tableContainer}>
      <Table
        columns={userColumns}
        data={userRows}
        columnWidthArr={[50, 50, 200, 250, 150]}
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

export { UsersTable };
