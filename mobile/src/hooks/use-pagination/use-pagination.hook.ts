import { PaginationDefaultValue } from '~/common/enums/enums';
import { useState } from '~/hooks/hooks';

type UsePaginationResult = {
  page: number;
  handlePageChange: (page: number) => void;
};

const usePagination = (): UsePaginationResult => {
  const [page, setPage] = useState<number>(PaginationDefaultValue.DEFAULT_PAGE);

  const handlePageChange = (page: number): void => {
    setPage(page);
  };

  return { page, handlePageChange };
};

export { usePagination };
