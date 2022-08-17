import { FC } from 'common/types/types';
import { Icon } from 'components/common/common';
import { Input } from 'components/common/input/input';
import { debounce } from 'helpers/helpers';
import {
  useAppDispatch,
  useAppForm,
  useEffect,
  useFormControl,
} from 'hooks/hooks';
import { dashboardActions } from 'store/actions';

import { DEFAULT_SEARCH_PAYLOAD, SEARCH_DELAY_MS } from './common/constants';
import { SearchPayload } from './common/types/types';
import styles from './styles.module.scss';

const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const onSearch = (search: string): void => {
    dispatch(dashboardActions.getCourses({ title: search, categoryKey: '' }));
  };

  const { control, errors } = useAppForm<SearchPayload>({
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
  });

  const { field } = useFormControl({ name: 'search', control: control });
  const { value } = field;

  const handleSearch = (): void => onSearch(value);
  const debounceHandleSearch = debounce(handleSearch, SEARCH_DELAY_MS);

  useEffect(() => {
    debounceHandleSearch();

    return () => debounceHandleSearch.clear();
  }, [value]);

  return (
    <div className={styles.searchWrapper}>
      <Icon name="search" className={styles.searchIcon} />
      <Input
        control={control}
        errors={errors}
        name="search"
        label="search"
        placeholder="Search or type"
        titleClass={styles.hidden}
        labelClass={styles.label}
        inputClass={styles.searchfield}
      />
    </div>
  );
};

export { SearchBar };
