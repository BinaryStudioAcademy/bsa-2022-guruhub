import React, { FC } from 'react';

import { DataStatus } from '~/common/enums/enums';
import { InterviewsGetAllItemResponseDto } from '~/common/types/types';
import {
  Pagination,
  ScrollView,
  Spinner,
  View,
} from '~/components/common/common';
import { DEFAULT_PAGE_SIZE } from '~/components/interviews/common/constants/constants';
import { statusToColor } from '~/components/interviews/common/maps/maps';
import {
  CategoryCell,
  StatusCell,
} from '~/components/interviews/interviews-table/components/components';
import { getFormattedDate } from '~/helpers/helpers';
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

  const interviewsRows = interviews.map(
    (item: InterviewsGetAllItemResponseDto) => {
      return {
        id: item.id,
        name: item.interviewee.userDetails.fullName,
        category: <CategoryCell category={item.courseCategory} />,
        status: (
          <StatusCell text={item.status} color={statusToColor[item.status]} />
        ),
        interviewer: item.interviewer?.userDetails.fullName ?? '',
        date: getFormattedDate(item.interviewDate, 'kk:mm, dd/MM/yyyy'),
      };
    },
  );

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
