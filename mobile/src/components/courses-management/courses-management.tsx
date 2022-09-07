import React, { FC } from 'react';

import { Pagination, ScrollView, View } from '~/components/common/common';
import { usePagination } from '~/hooks/hooks';

import { DEFAULT_PAGE_SIZE } from './common/constants/constants';
import { CoursesManagementTable } from './courses-management-table/courses-management-table';
import { styles } from './styles';

const CoursesManagement: FC = () => {
  const { page, handlePageChange } = usePagination();

  return (
    <ScrollView>
      <View style={styles.container}>
        <CoursesManagementTable />
        <View style={styles.paginationContainer}>
          <Pagination
            totalCount={5}
            pageSize={DEFAULT_PAGE_SIZE}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export { CoursesManagement };
