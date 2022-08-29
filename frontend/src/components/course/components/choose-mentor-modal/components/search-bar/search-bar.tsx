import { FC } from 'common/types/types';
import { Icon } from 'components/common/common';
import { Input } from 'components/common/input/input';
import { debounce } from 'helpers/helpers';
import { useAppForm, useEffect, useFormControl } from 'hooks/hooks';

import { DEFAULT_SEARCH_PAYLOAD, SEARCH_DELAY_MS } from './common/constants';
import { SearchPayload } from './common/types/types';
import styles from './styles.module.scss';

type Props = {
  onSearch: (search: string) => void;
};

const SearchBar: FC<Props> = ({ onSearch }) => {
  const { control, errors } = useAppForm<SearchPayload>({
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
  });

  const { field } = useFormControl({ name: 'search', control });
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
        inputClassName={styles.searchfield}
        hasVisuallyHiddenLabel
      />
    </div>
  );
};

export { SearchBar };
