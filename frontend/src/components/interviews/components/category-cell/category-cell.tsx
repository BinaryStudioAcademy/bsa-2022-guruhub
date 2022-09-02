import { StringCase } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Image } from 'components/common/common';
import { InterviewsTableRow } from 'components/interviews/common/types/types';
import { changeStringCase } from 'helpers/helpers';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const CategoryCell: FC<CellProps<InterviewsTableRow>> = ({ value }) => {
  const keyNameKebabCase = changeStringCase({
    stringToChange: value.key,
    caseType: StringCase.KEBAB_CASE,
  });

  return (
    <div className={styles.category}>
      <Image
        width="30px"
        height="30px"
        src={`/category-icons/${keyNameKebabCase}.svg`}
        alt={`${value.name} img`}
        isCircular
      />

      <p className={styles.categoryName}>{value.name}</p>
    </div>
  );
};

export { CategoryCell };
