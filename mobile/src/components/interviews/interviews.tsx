import React, { FC } from 'react';

import { DataStatus, PaginationDefaultValue } from '~/common/enums/enums';
import {
  Pagination,
  ScrollView,
  Spinner,
  View,
} from '~/components/common/common';
import { getTableRow } from '~/components/interviews/helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useFocusEffect,
  usePagination,
} from '~/hooks/hooks';
import { interviewsActions } from '~/store/actions';

import { InterviewsTable } from './interviews-table/interviews-table';
import { styles } from './styles';

const Interviews: FC = () => {
  const dispatch = useAppDispatch();
  const { interviews, interviewsTotalCount, interviewsDataStatus } =
    useAppSelector((state) => state.interviews);

  const { page, handlePageChange } = usePagination();
  const tableRows = getTableRow(interviews);

  const isInterviewsLoading = interviewsDataStatus === DataStatus.PENDING;

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

  return (
    <>
      {isInterviewsLoading && <Spinner isOverflow />}

      <ScrollView>
        <View style={styles.container}>
          <InterviewsTable tableData={tableRows} />
          <View style={styles.paginationContainer}>
            <Pagination
              totalCount={interviewsTotalCount}
              pageSize={PaginationDefaultValue.DEFAULT_COUNT}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export { Interviews };
