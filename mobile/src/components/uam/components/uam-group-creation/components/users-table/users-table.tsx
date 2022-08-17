import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';

import { PaginationDefaultValue } from '~/common/enums/enums';
import {
  FormControl,
  GroupsCreateRequestDto,
  UsersGetResponseDto,
} from '~/common/types/types';
import { Pagination, Table, View } from '~/components/common/common';

import { getUserColumns, getUserRows } from '../../helpers/helpers';
import { styles } from './styles';

type Props = {
  users: {
    items: UsersGetResponseDto[];
    total: number;
  };
  control: FormControl<GroupsCreateRequestDto>;
  onCheckbox: (id: number) => void;
  pagination: {
    page: number;
    setPage: (page: number) => void;
  };
};

const GroupCreationUsersTable: FC<Props> = ({
  users,
  control,
  onCheckbox,
  pagination,
}) => {
  const userRows = getUserRows({ users: users.items, control, onCheckbox });
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
