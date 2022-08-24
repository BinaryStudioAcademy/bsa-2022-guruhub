import { CategoryGetAllItemResponseDto, FC } from 'common/types/types';

import { Category } from './components/category/category';
import styles from './styles.module.scss';

type Props = {
  items: CategoryGetAllItemResponseDto[];
  handleClick: (evt: React.MouseEvent) => void;
  isActive: string;
};

const CategoriesList: FC<Props> = ({ items, handleClick, isActive }) => {
  return (
    <ul className={styles.categoriesList}>
      {items.map((category) => (
        <li key={category.id} className={styles.category}>
          <Category
            keyName={category.key}
            name={category.name}
            handleClick={handleClick}
            isActive={isActive}
          />
        </li>
      ))}
    </ul>
  );
};

export { CategoriesList };
