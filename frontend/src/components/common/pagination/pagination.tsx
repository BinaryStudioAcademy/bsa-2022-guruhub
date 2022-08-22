import { FC } from 'common/types/types';

import styles from './styles.module.scss';

type Props = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
};

const Pagination: FC<Props> = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleNextPageChange = (): void => {
    onPageChange(currentPage + 1);
  };

  const handlePreviousPageChange = (): void => {
    onPageChange(currentPage - 1);
  };

  return (
    <div className={styles.paginationContainer}>
      <p className={styles.results}>{totalCount} results</p>
      <div className={styles.pagination}>
        <button
          className={styles.back}
          onClick={handlePreviousPageChange}
          disabled={currentPage === 1}
        />
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className={styles.next}
          onClick={handleNextPageChange}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
};

export { Pagination };
