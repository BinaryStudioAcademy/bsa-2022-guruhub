import React, { FC } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { UsersGetResponseDto } from '~/common/types/types';
import { Pagination, Table, View } from '~/components/common/common';
import {
  getUserColumns,
  getUserRows,
} from '~/components/uam-groups-config/helpers/helpers';
import { useAppForm } from '~/hooks/hooks';

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
};

const UsersTable: FC<Props> = ({ users, onCheckboxToggle, pagination }) => {
  const { control } = useAppForm({ defaultValues: {} });
  const userRows = getUserRows({
    users: users.items,
    onToggle: onCheckboxToggle,
    control,
  });
  const userColumns = getUserColumns();

  return (
    <View style={styles.container}>
      <Table
        columns={userColumns}
        data={userRows}
        columnWidthArr={[60, 250, 250, 60]}
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
