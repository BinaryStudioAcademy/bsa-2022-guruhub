import { FC } from 'react';

import { CategoriesList } from './components/categories-list/categories-list';
import styles from './styles.module.scss';

const Dashboard: FC = () => {
  const mockedCategoriesList = [
    {
      id: 1,
      name: 'NodeJS',
    },
    {
      id: 2,
      name: 'TypeScript',
    },
    {
      id: 3,
      name: 'Java',
    },
    {
      id: 4,
      name: 'Python',
    },
    {
      id: 5,
      name: 'C',
    },
    {
      id: 6,
      name: 'NodeJS',
    },
    {
      id: 7,
      name: 'TypeScript',
    },
    {
      id: 8,
      name: 'Java',
    },
    {
      id: 9,
      name: 'Python',
    },
    {
      id: 10,
      name: 'C',
    },
    {
      id: 11,
      name: 'NodeJS',
    },
    {
      id: 12,
      name: 'TypeScript',
    },
    {
      id: 13,
      name: 'Java',
    },
    {
      id: 14,
      name: 'Python',
    },
    {
      id: 15,
      name: 'C',
    },
  ];

  return (
    <div className={styles.dashboard}>
      <CategoriesList categories={mockedCategoriesList} />
    </div>
  );
};

export { Dashboard };
