import React, { FC } from 'react';

import { Table, View } from '~/components/common/common';
import { CoursesManagementTableData } from '~/components/courses-management/common/types/types';
import { getCoursesManagementColumns } from '~/components/courses-management/helpers/helpers';

import { styles } from './styles';

type Props = {
  tableData: CoursesManagementTableData[];
};

const CoursesManagementTable: FC<Props> = ({ tableData }) => {
  const coursesManagementColumns = getCoursesManagementColumns();

  return (
    <View style={styles.tableContainer}>
      <Table
        columnWidthArr={[200, 200, 100]}
        columns={coursesManagementColumns}
        data={tableData}
      />
    </View>
  );
};

export { CoursesManagementTable };
