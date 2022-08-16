import { FC } from 'common/types/types';
import { Icon } from 'components/common/common';
import { debounce } from 'helpers/helpers';
import {
  useAppDispatch,
  useAppForm,
  useEffect,
  useFormControl,
} from 'hooks/hooks';
import { dashboardActions } from 'store/actions';

import { DEFAULT_SEARCH_PAYLOAD, SEARCH_DELAY_MS } from './common/constants';
import { SearchPayload } from './common/types/search-payload.type';
import styles from './styles.module.scss';

const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const onSearch = (search: string): void => {
    dispatch(dashboardActions.getCoursesByName({ title: search }));
  };

  const { control } = useAppForm<SearchPayload>({
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
  });

  const { field } = useFormControl({ name: 'search', control: control });
  const { value, onChange } = field;

  const handleSearch = (): void => onSearch(value);
  const debounceHandleSearch = debounce(handleSearch, SEARCH_DELAY_MS);

  useEffect(() => {
    debounceHandleSearch();

    return () => debounceHandleSearch.clear();
  }, [value]);

  return (
    <div className={styles.searchWrapper}>
      <Icon name="search" className={styles.searchIcon} />
      <input
        type="text"
        className={styles.searchfield}
        placeholder="Search or type"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export { SearchBar };
