import { ReactElement } from 'react';

import { Category } from './components/category/category';
import styles from './styles.module.scss';

type MockedCategoryType = {
  id: number;
  name: string;
};

type Props = {
  categories: MockedCategoryType[];
};

const CategoriesList = ({ categories }: Props): ReactElement => {
  return (
    <div className={styles.categoriesList}>
      {categories.map((category) => (
        <Category
          key={category.id}
          img={`/${category.name}.svg`}
          name={category.name}
          textColor={'white'}
          borderColor={'yellow'}
          backgroundColor={'#1e1e2c'}
        />
      ))}
    </div>
  );
};

export { CategoriesList };
