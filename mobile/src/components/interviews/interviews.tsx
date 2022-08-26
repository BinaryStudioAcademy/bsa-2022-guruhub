import React, { FC } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { ScrollView, View } from '~/components/common/common';
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
  const { interviews, interviewsTotalCount } = useAppSelector(
    (state) => state.interviews,
  );
  const { page } = usePagination();
  const tableRows = getTableRow(interviews);

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
    <ScrollView>
      <View style={styles.container}>
        <InterviewsTable tableData={tableRows} />
      </View>
    </ScrollView>
  );
};

export { Interviews };
