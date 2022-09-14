import { FC } from 'common/types/types';

import styles from './styles.module.scss';

const NO_ITEMS_PAGE_COUNT = 0;
const ONE_ITEM_COUNT = 1;

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

  const isNextBtnDisabled =
    currentPage === totalPages || totalPages === NO_ITEMS_PAGE_COUNT;

  return (
    <div className={styles.paginationContainer}>
      <p className={styles.results}>
        {totalCount} {totalCount === ONE_ITEM_COUNT ? 'result' : 'results'}
      </p>
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
          disabled={isNextBtnDisabled}
        />
      </div>
    </div>
  );
};

export { Pagination };
