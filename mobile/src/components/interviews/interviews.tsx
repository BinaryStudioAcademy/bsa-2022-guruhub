import React, { FC } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { ScrollView, View } from '~/components/common/common';
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
    <ScrollView>
      <View style={styles.container}>
        <InterviewsTable tableData={tableData} />
      </View>
    </ScrollView>
  );
};

export { Interviews };
