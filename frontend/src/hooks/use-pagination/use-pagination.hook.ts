import { URLSearchParamsInit } from 'common/types/types';
import { getValidPageFromSearchParams } from 'helpers/pagination/get-valid-page-from-search-params/get-valid-page-from-search-params.helper';
import { useState } from 'hooks/hooks';

type UsePaginationArgs = {
  pageFromQuery: number;
  searchParams: URLSearchParamsInit;
  setSearchParams: (nextInit: URLSearchParamsInit) => void;
};

type UsePaginationResult = {
  page: number;
  handlePageChange: (page: number) => void;
};

const usePagination = ({
  pageFromQuery,
  searchParams,
  setSearchParams,
}: UsePaginationArgs): UsePaginationResult => {
  const validPage = getValidPageFromSearchParams(pageFromQuery);

  const [page, setPage] = useState<number>(validPage);

  const handlePageChange = (page: number): void => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('page', String(page));
    setSearchParams(updatedSearchParams);
    setPage(page);
  };

  return { page, handlePageChange };
};

export { usePagination };
