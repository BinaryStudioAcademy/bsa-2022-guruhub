import { SearchValue } from 'common/enums/enums';
import { CategoryGetAllItemResponseDto, FC } from 'common/types/types';
import { Category } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';
import { useCourseSearch, useRef } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  items: CategoryGetAllItemResponseDto[];
};

const CategoriesList: FC<Props> = ({ items }) => {
  const { searchParams, handleSearchPerform } = useCourseSearch();
  const listEl = useRef<HTMLUListElement>(null);

  const activeCategory = searchParams.get(SearchValue.CATEGORY) ?? '';

  const handleClick = (keyName: string): void => {
    listEl.current?.scroll({ left: 0, behavior: 'smooth' });

    if (keyName === searchParams.get(SearchValue.CATEGORY)) {
      handleSearchPerform(SearchValue.CATEGORY, '');

      return;
    }
    handleSearchPerform(SearchValue.CATEGORY, keyName);
  };

  return (
    <ul ref={listEl} className={styles.categoriesList}>
      {items.map((category) => (
        <li
          key={category.id}
          className={getValidClasses(
            styles.category,
            activeCategory === category.key && styles.selected,
          )}
        >
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
