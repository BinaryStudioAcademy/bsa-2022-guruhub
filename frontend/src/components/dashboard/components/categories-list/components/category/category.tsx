import { StringCase } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Image } from 'components/common/common';
import { changeStringCase, getValidClasses } from 'helpers/helpers';
import { useSearch } from 'hooks/hooks';

import { getRandomColor } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  keyName: string;
  name: string;
};

const Category: FC<Props> = ({ keyName, name }) => {
  const { searchParams, performSearch } = useSearch();
  const activeCategory = searchParams.get('category') || '';

  const handleClick = (evt: React.MouseEvent): void => {
    let category = evt.currentTarget.id;

    if (category === searchParams.get('category')) {
      category = '';
    }
    performSearch('category', category);
  };

  const keyNameKebabCase = changeStringCase({
    stringToChange: keyName,
    caseType: StringCase.KEBAB_CASE,
  });

  return (
    <div
      id={keyName}
      className={getValidClasses(
        styles.category,
        activeCategory === keyName && styles.selected,
      )}
      style={{ borderColor: getRandomColor() }}
      onClick={handleClick}
    >
      <Image
        width="30px"
        height="30px"
        src={`/category-icons/${keyNameKebabCase}.svg`}
        alt={`${keyName} img`}
        isCircular
      />

      <p className={styles.categoryName}>{name}</p>
    </div>
  );
};

export { Category };
