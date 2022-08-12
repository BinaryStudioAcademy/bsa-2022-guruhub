import { ReactElement } from 'react';

import { Category } from './components/category/category';
import styles from './styles.module.scss';

type Category = {
  id: number;
  name: string;
};

type Props = {
  items: Category[];
};

const CategoriesList = ({ items }: Props): ReactElement => {
  return (
    <div className={styles.categoriesList}>
      {items.map((category) => (
        <Category
          key={category.id}
          img={`/${category.name.toLowerCase()}.svg`}
          name={category.name}
        />
      ))}
    </div>
  );
};

export { CategoriesList };
