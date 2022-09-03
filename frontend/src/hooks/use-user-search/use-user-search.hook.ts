import { SearchValue } from 'common/enums/enums';
import { useAppDispatch, useSearchParams } from 'hooks/hooks';
import { chatsActions } from 'store/actions';

type UseCourseSearchResult = {
  searchParams: URLSearchParams;
  performSearch: (name: string, value: string) => void;
};

const useUserSearch = (): UseCourseSearchResult => {
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

    const fullName = searchParams.get(SearchValue.FULLNAME) ?? '';

    dispatch(chatsActions.getLastMessages({ fullName }));
  };

  return { searchParams, performSearch };
};

export { useUserSearch };
