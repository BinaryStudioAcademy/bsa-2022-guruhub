import { SearchValue } from 'common/enums/enums';
import { CategoryGetAllItemResponseDto, FC } from 'common/types/types';
import { Category } from 'components/common/common';
import { useSearch } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  items: CategoryGetAllItemResponseDto[];
};

const CategoriesList: FC<Props> = ({ items }) => {
  const { searchParams, performSearch } = useSearch();

  const activeCategory = searchParams.get(SearchValue.CATEGORY) ?? '';

  const handleClick = (evt: React.MouseEvent): void => {
    const category = evt.currentTarget.id;

    if (category === searchParams.get(SearchValue.CATEGORY)) {
      performSearch(SearchValue.CATEGORY, '');

      return;
    }
    performSearch(SearchValue.CATEGORY, category);
  };

  return (
    <ul className={styles.categoriesList}>
      {items.map((category) => (
        <li key={category.id} className={styles.category}>
          <Category
            keyName={category.key}
            name={category.name}
            activeCategory={activeCategory}
            onClick={handleClick}
          />
        </li>
      ))}
    </ul>
  );
};

export { CategoriesList };
