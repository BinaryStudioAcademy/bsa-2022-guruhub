import { FC } from 'common/types/types';

import styles from './styles.module.scss';

type Props = {
  postTime: string;
};

const DateSeparator: FC<Props> = ({ postTime }) => {
  return (
    <div className={styles.dateSeparator}>
      {`${new Date(postTime).getDate()} ${new Date(postTime).toLocaleString(
        'default',
        {
          month: 'short',
        },
      )}`}
    </div>
  );
};

export { DateSeparator };
