import { FC } from 'common/types/types';
import { useEffect, useState } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  totalCount: number;
  pageSize?: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
};

const Pagination: FC<Props> = ({
  totalCount,
  pageSize = 5,
  currentPage,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const total = Math.ceil(totalCount / pageSize);
    setTotalPages(total);
  }, []);

  const onNext = (): void => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = (): void => {
    onPageChange(currentPage - 1);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.back}
        onClick={onPrevious}
        disabled={currentPage === 1}
      ></button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button
        className={styles.next}
        onClick={onNext}
        disabled={currentPage === totalPages}
      ></button>
    </div>
  );
};

export { Pagination };
