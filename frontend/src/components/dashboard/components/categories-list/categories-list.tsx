import { FC, IconName } from 'common/types/types';

import { Category } from './components/category/category';
import styles from './styles.module.scss';

type Category = {
  id: number;
  key: string;
  name: string;
};

type Props = {
  items: Category[];
};

const CategoriesList: FC<Props> = ({ items }: Props) => {
  return (
    <ul className={styles.categoriesList}>
      {items.map((category) => (
        <li key={category.id}>
          <Category iconName={category.key as IconName} name={category.name} />
        </li>
      ))}
    </ul>
  );
};

export { CategoriesList };
