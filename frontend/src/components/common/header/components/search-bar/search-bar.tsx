import { FC } from 'common/types/types';
import { Icon } from 'components/common/common';
import { Input } from 'components/common/input/input';
import { debounce } from 'helpers/helpers';
import { useAppForm, useEffect } from 'hooks/hooks';

import { DEFAULT_SEARCH_PAYLOAD, SEARCH_DELAY_MS } from './common/constants';
import { SearchPayload } from './common/types/types';
import styles from './styles.module.scss';

type Props = {
  onSearch: (search: string) => void;
};

const SearchBar: FC<Props> = ({ onSearch }) => {
  const { control, errors, watch } = useAppForm<SearchPayload>({
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
  });

  const { watch: outerFormWatch } = useAppForm({
    mode: 'onChange',
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
  });

  const handleSearch = (): void => onSearch(watch('search'));
  const debounceHandleSearch = debounce(handleSearch, SEARCH_DELAY_MS);

  const handlePassOuterFormInputValue = (): void => {
    debounceHandleSearch();
  };

  useEffect(() => {
    debounceHandleSearch();

    return () => debounceHandleSearch.clear();
  }, [outerFormWatch('search')]);

  return (
    <div className={styles.searchWrapper}>
      <Icon name="search" className={styles.searchIcon} />
      <form
        className={styles.outerForm}
        onChange={handlePassOuterFormInputValue}
      >
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
