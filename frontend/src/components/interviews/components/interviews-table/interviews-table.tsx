import { FC } from 'common/types/types';
import { Table } from 'components/common/common';
import { InterviewsTableRow } from 'components/interviews/common/types/types';
import {
  getInterviewsColumns,
  getInterviewsRows,
} from 'components/interviews/helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
} from 'hooks/hooks';
import { Column } from 'react-table';
import { interviewsActions } from 'store/actions';

import styles from './styles.module.scss';

const InterviewTable: FC = () => {
  const dispatch = useAppDispatch();
  const { interviews } = useAppSelector((state) => state.interviews);

  useEffect(() => {
    dispatch(interviewsActions.getInterviews());
  }, []);

  const columns = useMemo<Column<InterviewsTableRow>[]>(() => {
    return getInterviewsColumns();
  }, []);

  const data: InterviewsTableRow[] = getInterviewsRows(interviews);

  return (
    <div className={styles.table}>
      <Table data={data} columns={columns} />
    </div>
  );
};

export { InterviewTable };
