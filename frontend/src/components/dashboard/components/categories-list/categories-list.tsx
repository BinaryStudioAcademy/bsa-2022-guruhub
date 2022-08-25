import { SearchValues } from 'common/enums/enums';
import { CategoryGetAllItemResponseDto, FC } from 'common/types/types';
import { useSearch } from 'hooks/hooks';

import { Category } from './components/category/category';
import styles from './styles.module.scss';

type Props = {
  items: CategoryGetAllItemResponseDto[];
};

const CategoriesList: FC<Props> = ({ items }) => {
  const { searchParams, performSearch } = useSearch();

  const activeCategory = searchParams.get(SearchValues.CATEGORY) ?? '';

  const handleClick = (evt: React.MouseEvent): void => {
    const category = evt.currentTarget.id;

    if (category === searchParams.get(SearchValues.CATEGORY)) {
      performSearch(SearchValues.CATEGORY, '');

      return;
    }
    performSearch(SearchValues.CATEGORY, category);
  };

  return (
    <ul className={styles.categoriesList}>
      {items.map((category) => (
        <li key={category.id} className={styles.category}>
          <Category
            keyName={category.key}
            name={category.name}
            activeCategory={activeCategory}
            handleClick={handleClick}
          />
        </li>
      ))}
    </ul>
  );
};

export { CategoriesList };
