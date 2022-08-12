import { IconName } from 'common/types/types';
import { ReactElement } from 'react';

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

const CategoriesList = ({ items }: Props): ReactElement => {
  return (
    <div className={styles.categoriesList}>
      {items.map((category) => (
        <Category
          key={category.id}
          iconName={category.key as IconName}
          name={category.name}
        />
      ))}
    </div>
  );
};

export { CategoriesList };
