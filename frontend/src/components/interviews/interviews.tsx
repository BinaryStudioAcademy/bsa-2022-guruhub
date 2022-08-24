import { FC } from 'common/types/types';

import { InterviewTable } from './components/interviews-table/interviews-table';
import styles from './styles.module.scss';

const Interviews: FC = () => {
  return (
    <div className={styles.interviews}>
      <h1 className={styles.pageTitle}>Interviews</h1>
      <InterviewTable />
    </div>
  );
};

export { Interviews };
