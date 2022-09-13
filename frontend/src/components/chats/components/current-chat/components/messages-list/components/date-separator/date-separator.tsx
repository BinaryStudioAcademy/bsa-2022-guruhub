import { FC } from 'common/types/types';
import {
  checkIsCurrentYear,
  checkIsToday,
  getFormattedDate,
} from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  postTime: string;
};

const DateSeparator: FC<Props> = ({ postTime }) => {
  const messageDate = new Date(postTime);
  const isToday = checkIsToday(messageDate);
  const isCurrentYear = checkIsCurrentYear(messageDate);

  const dateFormat = isCurrentYear ? 'dd MMM' : 'dd MMM yyyy';

  return (
    <div className={styles.dateSeparator}>
      {isToday ? 'Today' : getFormattedDate(postTime, dateFormat)}
    </div>
  );
};

export { DateSeparator };
