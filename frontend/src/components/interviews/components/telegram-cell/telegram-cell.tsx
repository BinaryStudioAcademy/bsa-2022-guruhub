import { FC } from 'common/types/types';
import { InterviewsTableRow } from 'components/interviews/common/types/types';
import { generateTelegramLink } from 'helpers/helpers';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const TelegramCell: FC<CellProps<InterviewsTableRow>> = ({ value }) => {
  if (!value) {
    return <p className={styles.placeholder}>Not set</p>;
  }

  return (
    <a href={generateTelegramLink(value)} className={styles.idLink}>
      @{value}
    </a>
  );
};

export { TelegramCell };
