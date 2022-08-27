import { StringCase } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { OtherApplicationsTableRow } from 'components/interview/common/types/other-applications-table-row.type';
import { changeStringCase, getValidClasses } from 'helpers/helpers';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const StatusCell: FC<CellProps<OtherApplicationsTableRow>> = ({ value }) => {
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
