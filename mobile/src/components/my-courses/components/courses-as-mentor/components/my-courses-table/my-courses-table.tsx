import React, { FC } from 'react';

import { Spinner, Table, View } from '~/components/common/common';
import { MyCoursesTableData } from '~/components/my-courses/common/types/types';
import { getMyCourseColumns } from '~/components/my-courses/helpers/helpers';

import { styles } from './styles';

type Props = {
  tableData: MyCoursesTableData[];
  isLoading: boolean;
};

const MyCoursesTable: FC<Props> = ({ tableData, isLoading }) => {
  const coursesColumns = getMyCourseColumns();

  return (
    <View style={styles.tableContainer}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table
          columnWidthArr={[350, 150]}
          columns={coursesColumns}
          data={tableData}
        />
      )}
    </View>
  );
};

export { MyCoursesTable };
