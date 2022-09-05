import { StringCase } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Image } from 'components/common/common';
import { CourseCategoriesTableRow } from 'components/course-categories/common/types/types';
import { changeStringCase } from 'helpers/helpers';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const CategoryCell: FC<CellProps<CourseCategoriesTableRow>> = ({ value }) => {
  if (!value) {
    return <p className={styles.placeholder}>No category selected</p>;
  }

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
