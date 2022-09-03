import React, { FC } from 'react';

import { Table, View } from '~/components/common/common';
import { InterviewsTableData } from '~/components/interviews/common/types/types';
import { getInterviewsColumns } from '~/components/interviews/helpers/helpers';

import { styles } from './styles';

type Props = {
  tableData: InterviewsTableData[];
};

const InterviewsTable: FC<Props> = ({ tableData }) => {
  const interviewsColumns = getInterviewsColumns();

  return (
    <View style={styles.tableContainer}>
      <Table
        columnWidthArr={[50, 180, 210, 140, 200, 170]}
        columns={interviewsColumns}
        data={tableData}
      />
    </View>
  );
};

export { InterviewsTable };
