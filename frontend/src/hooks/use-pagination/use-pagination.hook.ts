import { PaginationDefaultValue } from 'common/enums/enums';
import { useSearchParams, useState } from 'hooks/hooks';

type UsePaginationResult = {
  page: number;
  handlePageChange: (page: number) => void;
};

function usePagination(): UsePaginationResult {
  const [searchParams, setSearchParams] = useSearchParams();

  const getValidPageFromSearchParams = (): number => {
    const pageFromQuery = Number(searchParams.get('page'));

    return pageFromQuery > 0
      ? pageFromQuery
      : PaginationDefaultValue.DEFAULT_PAGE;
  };

  const [page, setPage] = useState<number>(getValidPageFromSearchParams());

  const handlePageChange = (page: number): void => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('page', String(page));
    setSearchParams(updatedSearchParams);
    setPage(page);
  };

  return { page, handlePageChange };
}

export { usePagination };
