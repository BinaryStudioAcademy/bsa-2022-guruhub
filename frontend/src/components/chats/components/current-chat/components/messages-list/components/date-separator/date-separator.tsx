import { FC } from 'common/types/types';
import { checkIsToday, getFormattedDate } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  postTime: string;
};

const DateSeparator: FC<Props> = ({ postTime }) => {
  const isToday = checkIsToday(new Date(postTime));

  return (
    <div className={styles.dateSeparator}>
      {isToday ? 'Today' : getFormattedDate(postTime, 'dd MMM')}
    </div>
  );
};

export { DateSeparator };
