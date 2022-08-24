import { StringCase } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Image } from 'components/common/common';
import { InterviewsTableRow } from 'components/interviews/common/types/interviews-table-row.type';
import { changeStringCase } from 'helpers/helpers';
import { CellProps } from 'react-table';

// import { getRandomColor } from './helpers/helpers';
import styles from './styles.module.scss';

const CategoryCell: FC<CellProps<InterviewsTableRow>> = ({ value }) => {
  const keyNameKebabCase = changeStringCase({
    stringToChange: value,
    caseType: StringCase.KEBAB_CASE,
  });

  return (
    <div className={styles.category}>
      <Image
        width="30px"
        height="30px"
        src={`/category-icons/${keyNameKebabCase}.svg`}
        alt={`${value} img`}
        isCircular
      />

      <p className={styles.categoryName}>{value}</p>
    </div>
  );
};

export { CategoryCell };
