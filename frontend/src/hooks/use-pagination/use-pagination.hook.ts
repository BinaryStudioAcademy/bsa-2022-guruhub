import { useSearchParams, useState } from 'hooks/hooks';

import { getValidPageFromSearchParams } from './helpers/helpers';

type UsePaginationArgs = {
  queryName: string;
};

type UsePaginationResult = {
  page: number;
  handlePageChange: (page: number) => void;
};

const usePagination = ({
  queryName,
}: UsePaginationArgs): UsePaginationResult => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromQuery = Number(searchParams.get(queryName));

  const validPage = getValidPageFromSearchParams(pageFromQuery);

  const [page, setPage] = useState<number>(validPage);

  const handlePageChange = (page: number): void => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set(queryName, String(page));
    setSearchParams(updatedSearchParams);
    setPage(page);
  };

  return { page, handlePageChange };
};

export { usePagination };
