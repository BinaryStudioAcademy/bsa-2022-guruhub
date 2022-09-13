import { StringCase } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Image } from 'components/common/common';
import { OtherApplicationsTableRow } from 'components/interview/common/types/types';
import { changeStringCase } from 'helpers/helpers';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const CategoryCell: FC<CellProps<OtherApplicationsTableRow>> = ({ value }) => {
  const categoryKeyKebabCase = changeStringCase({
    caseType: StringCase.KEBAB_CASE,
    stringToChange: value.key,
  });

  return (
    <div className={styles.categoryWrapper}>
      <Image
        alt="category"
        height="30"
        width="30"
        src={`/category-icons/${categoryKeyKebabCase}.svg`}
      />
      <p>{value.name}</p>
    </div>
  );
};

export { CategoryCell };
