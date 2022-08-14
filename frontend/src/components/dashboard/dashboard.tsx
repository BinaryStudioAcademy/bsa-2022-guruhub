import { FC } from 'react';

import { CategoriesList } from './components/categories-list/categories-list';
import styles from './styles.module.scss';

const Dashboard: FC = () => {
  const mockedCategoriesList = [
    {
      id: 1,
      key: 'nodejs',
      name: 'NodeJS',
    },
    {
      id: 2,
      key: 'typescript',
      name: 'TypeScript',
    },
    {
      id: 3,
      key: 'java',
      name: 'Java',
    },
    {
      id: 4,
      key: 'python',
      name: 'Python',
    },
    {
      id: 5,
      key: 'c',
      name: 'C',
    },
    {
      id: 6,
      key: 'nodejs',
      name: 'NodeJS',
    },
    {
      id: 7,
      key: 'typescript',
      name: 'TypeScript',
    },
    {
      id: 8,
      key: 'java',
      name: 'Java',
    },
    {
      id: 9,
      key: 'python',
      name: 'Python',
    },
    {
      id: 10,
      key: 'c',
      name: 'C',
    },
    {
      id: 11,
      key: 'nodejs',
      name: 'NodeJS',
    },
    {
      id: 12,
      key: 'typescript',
      name: 'TypeScript',
    },
    {
      id: 13,
      key: 'java',
      name: 'Java',
    },
    {
      id: 14,
      key: 'python',
      name: 'Python',
    },
    {
      id: 15,
      key: 'c',
      name: 'C',
    },
  ];

  return (
    <div className={styles.dashboard}>
      <CategoriesList items={mockedCategoriesList} />
    </div>
  );
};

export { Dashboard };
