import React, { FC } from 'react';

import { DataStatus } from '~/common/enums/enums';
import {
  Pagination,
  ScrollView,
  Spinner,
  View,
} from '~/components/common/common';
import { DEFAULT_PAGE_SIZE } from '~/components/interviews/common/constants/constants';
import { getInterviewsRows } from '~/components/interviews/helpers/helpers';
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
  const interviewsRows = getInterviewsRows(interviews);

  const isInterviewsLoading = interviewsDataStatus === DataStatus.PENDING;

  useFocusEffect(
    useCallback(() => {
      dispatch(
        interviewsActions.getInterviews({
          page,
          count: DEFAULT_PAGE_SIZE,
        }),
      );
    }, [page, interviewsTotalCount]),
  );

  if (isInterviewsLoading) {
    return <Spinner isOverflow />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <InterviewsTable tableData={interviewsRows} />
        <View style={styles.paginationContainer}>
          <Pagination
            totalCount={interviewsTotalCount}
            pageSize={DEFAULT_PAGE_SIZE}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export { Interviews };
