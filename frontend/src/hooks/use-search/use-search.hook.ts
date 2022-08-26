import { SearchValue } from 'common/enums/enums';
import { useAppDispatch, useSearchParams } from 'hooks/hooks';
import { dashboardActions } from 'store/actions';

type UseSearchResult = {
  searchParams: URLSearchParams;
  performSearch: (name: string, value: string) => void;
};

const useSearch = (): UseSearchResult => {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const performSearch = (name: string, value: string): void => {
    if (searchParams.has(name) && !value) {
      searchParams.delete(name);
      setSearchParams(searchParams);
    }

    if (value) {
      searchParams.set(name, value);
      setSearchParams(searchParams);
    }

    const category = searchParams.get(SearchValue.CATEGORY) ?? '';
    const title = searchParams.get(SearchValue.TITLE) ?? '';

    dispatch(dashboardActions.getCourses({ title, categoryKey: category }));
  };

  return { searchParams, performSearch };
};

export { useSearch };
