import { PaginationDefaultValue } from 'common/enums/enums';

const getValidPageFromSearchParams = (pageFromQuery: number): number => {
  const page =
    pageFromQuery > 0 ? pageFromQuery : PaginationDefaultValue.DEFAULT_PAGE;

  return page;
};

export { getValidPageFromSearchParams };
