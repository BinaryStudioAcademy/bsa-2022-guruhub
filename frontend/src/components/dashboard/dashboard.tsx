import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { FC, useEffect } from 'react';
import { dashboardActions } from 'store/actions';

import { CategoriesList } from './components/categories-list/categories-list';
import styles from './styles.module.scss';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(dashboardActions.getCategories());
  }, []);

  return (
    <div className={styles.dashboard}>
      <CategoriesList items={categories} />
    </div>
  );
};

export { Dashboard };
