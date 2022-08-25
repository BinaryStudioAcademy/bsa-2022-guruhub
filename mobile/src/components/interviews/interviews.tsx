import React, { FC } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { Table, View } from '~/components/common/common';
import { getInterviewsColumns } from '~/components/interviews/helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useFocusEffect,
  usePagination,
} from '~/hooks/hooks';
import { interviewsActions } from '~/store/actions';

import { styles } from './styles';

const Interviews: FC = () => {
  const dispatch = useAppDispatch();
  const { interviews, interviewsTotalCount } = useAppSelector(
    (state) => state.interviews,
  );
  const { page } = usePagination();

  useFocusEffect(
    useCallback(() => {
      dispatch(
        interviewsActions.getInterviews({
          page,
          count: PaginationDefaultValue.DEFAULT_COUNT,
        }),
      );
    }, [page, interviewsTotalCount]),
  );

  const interviewsColumns = getInterviewsColumns();
  const tableData = interviews.map((item) => {
    return {
      id: item.id,
      name: item.interviewee.fullName,
      direction: item.courseCategory.name,
      status: item.status,
      interviewer: item.interviewer.fullName,
      date: item.interviewDate,
    };
  });

  return (
    <View style={styles.tableContainer}>
      <Table
        columnWidthArr={[50, 180, 100, 100, 200, 200]}
        columns={interviewsColumns}
        data={tableData}
      />
    </View>
  );
};

export { Interviews };
