import { FC } from 'common/types/types';
import { getFormattedDate, isTodayCheck } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  postTime: string;
};

const DateSeparator: FC<Props> = ({ postTime }) => {
  const isToday = isTodayCheck(new Date(postTime));

  return (
    <div className={styles.dateSeparator}>
      {isToday ? 'Today' : getFormattedDate(postTime, 'dd MMM')}
    </div>
  );
};

export { DateSeparator };
