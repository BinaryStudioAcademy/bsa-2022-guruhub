import { SearchValue } from 'common/enums/enums';
import { CategoryGetAllItemResponseDto, FC } from 'common/types/types';
import { Category } from 'components/common/common';
import { useCourseSearch } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  items: CategoryGetAllItemResponseDto[];
};

const CategoriesList: FC<Props> = ({ items }) => {
  const { searchParams, performSearch } = useCourseSearch();

  const activeCategory = searchParams.get(SearchValue.CATEGORY) ?? '';

  const handleClick = (keyName: string): void => {
    if (keyName === searchParams.get(SearchValue.CATEGORY)) {
      performSearch(SearchValue.CATEGORY, '');

      return;
    }
    performSearch(SearchValue.CATEGORY, keyName);
  };

  return (
    <ul className={styles.categoriesList}>
      {items.map((category) => (
        <li key={category.id} className={styles.category}>
          <Category
            keyName={category.key}
            name={category.name}
            isActive={activeCategory === category.key}
            onClick={handleClick}
          />
        </li>
      ))}
    </ul>
  );
};

export { CategoriesList };
