import React, { FC } from 'react';

import { DataStatus, InterviewScreenName } from '~/common/enums/enums';
import {
  InterviewsGetAllItemResponseDto,
  InterviewsUpdateRequestParamsDto,
} from '~/common/types/types';
import {
  CategoryCell,
  Chip,
  Pagination,
  ScrollView,
  Spinner,
  View,
} from '~/components/common/common';
import { DEFAULT_PAGE_SIZE } from '~/components/interviews/common/constants/constants';
import { statusToColor } from '~/components/interviews/common/maps/maps';
import { IdCell } from '~/components/interviews/interviews-table/components/components';
import { getFormattedDate } from '~/helpers/helpers';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useCallback,
  useFocusEffect,
  usePagination,
} from '~/hooks/hooks';
import { interviewActions, interviewsActions } from '~/store/actions';

import { InterviewsTable } from './interviews-table/interviews-table';
import { styles } from './styles';

const Interviews: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();
  const { interviews, interviewsTotalCount, interviewsDataStatus } =
    useAppSelector((state) => state.interviews);

  const { page, handlePageChange } = usePagination();

  const handleInterviewSelect = (
    id: InterviewsUpdateRequestParamsDto,
  ): void => {
    dispatch(interviewActions.getInterview(id));
    navigation.navigate(InterviewScreenName.INTERVIEW);
  };

  const interviewsRows = interviews.map(
    (item: InterviewsGetAllItemResponseDto) => {
      return {
        id: <IdCell id={item.id} onPress={handleInterviewSelect} />,
        name: item.interviewee.userDetails.fullName,
        category: <CategoryCell category={item.courseCategory} />,
        status: <Chip text={item.status} color={statusToColor[item.status]} />,
        interviewer:
          item.interviewer?.userDetails.fullName ?? 'Not assigned yet',
        date: item.interviewDate
          ? getFormattedDate(item.interviewDate, 'HH:mm dd.MM.yyyy')
          : 'Not assigned yet',
      };
    },
  );

  const isInterviewsLoading = interviewsDataStatus === DataStatus.PENDING;

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        headerShown: true,
      });
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
