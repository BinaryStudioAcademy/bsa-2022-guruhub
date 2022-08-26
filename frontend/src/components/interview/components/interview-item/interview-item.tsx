import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { InterviewsGetAllItemResponseDto } from 'guruhub-shared';
import { getFormattedDate } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  interview: InterviewsGetAllItemResponseDto | null;
};

const InterviewItem: FC<Props> = ({ interview }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerInterview}>
        <p className={styles.parameters}>Parameters</p>
        <Button type="button" btnType="outlined" btnColor="blue" label="Edit" />
      </div>
      <div className={styles.interviewForm}>
        <div className={styles.interviewRow}>
          <p className={styles.header}>Name</p>
          <p className={styles.interviewValue}>{interview?.interviewee.id}</p>
        </div>
        <div className={styles.interviewRow}>
          <p className={styles.header}>Email</p>
          <p className={styles.interviewValue}>
            {interview?.interviewee.email}
          </p>
        </div>
        <div className={styles.interviewRow}>
          <p className={styles.header}>Type of course</p>
          <p className={styles.courseCategory}>
            {interview?.courseCategory.name}
          </p>
        </div>
        <div className={styles.interviewRow}>
          <p className={styles.header}>Date of interview</p>
          <p className={styles.interviewValue}>
            {interview?.interviewDate
              ? getFormattedDate(
                  interview?.interviewDate.toString(),
                  'yyyy-MM-dd',
                )
              : ''}
          </p>
        </div>
        <div className={styles.interviewRow}>
          <p className={styles.header}>Interviewer</p>
          <p className={styles.interviewValue}>
            {interview?.interviewer.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export { InterviewItem };
