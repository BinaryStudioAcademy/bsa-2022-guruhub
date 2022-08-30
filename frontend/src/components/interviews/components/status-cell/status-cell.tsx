import { StringCase } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { InterviewsTableRow } from 'components/interviews/common/types/types';
import { changeStringCase, getValidClasses } from 'helpers/helpers';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const StatusCell: FC<CellProps<InterviewsTableRow>> = ({ value }) => {
  const camelCaseStatus = changeStringCase({
    caseType: StringCase.CAMEL_CASE,
    stringToChange: value,
  });

  return (
    <span className={getValidClasses(styles.status, styles[camelCaseStatus])}>
      {value}
    </span>
  );
};

export { StatusCell };
