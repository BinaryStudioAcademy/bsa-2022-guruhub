import { FC } from 'common/types/types';
import { Icon } from 'components/common/common';
import { Input } from 'components/common/input/input';
import { debounce } from 'helpers/helpers';
import { useAppForm, useEffect } from 'hooks/hooks';
import { useForm } from 'react-hook-form';

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

  const { getValues } = useForm({
    mode: 'onChange',
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
  });

  const handleSearch = (): void => onSearch(getValues('search'));
  const debounceHandleSearch = debounce(handleSearch, SEARCH_DELAY_MS);

  useEffect(() => {
    debounceHandleSearch();

    return () => debounceHandleSearch.clear();
  }, [getValues('search')]);

  return (
    <div className={styles.searchWrapper}>
      <Icon name="search" className={styles.searchIcon} />
      <form>
        <Input
          control={control}
          errors={errors}
          name="search"
          label="search"
          placeholder="Search or type"
          inputClassName={styles.searchfield}
          hasVisuallyHiddenLabel
        />
      </form>
    </div>
  );
};

export { SearchBar };
