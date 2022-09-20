import { PaginationDefaultValue, SearchValue } from 'common/enums/enums';
import { useAppDispatch, useSearchParams } from 'hooks/hooks';
import { dashboardActions } from 'store/actions';

type UseCourseSearchResult = {
  searchParams: URLSearchParams;
  handleSearchPerform: (name: string, value: string) => void;
};

const useCourseSearch = (): UseCourseSearchResult => {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchPerform = (name: string, value: string): void => {
    if (searchParams.has(name) && !value) {
      searchParams.delete(name);
      setSearchParams(searchParams);
    }

    if (value) {
      searchParams.set(name, value);
    }

    searchParams.set('page', '1');
    setSearchParams(searchParams);

    const category = searchParams.get(SearchValue.CATEGORY) ?? '';
    const title = searchParams.get(SearchValue.TITLE) ?? '';

    dispatch(
      dashboardActions.getCourses({
        title,
        categoryKey: category,
        page: PaginationDefaultValue.DEFAULT_PAGE,
        count: PaginationDefaultValue.DEFAULT_COUNT_BY_20,
      }),
    );
  };

  return { searchParams, handleSearchPerform };
};

export { useCourseSearch };
