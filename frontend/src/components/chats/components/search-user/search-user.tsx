import { SearchValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Icon, Input } from 'components/common/common';
import { debounce } from 'helpers/helpers';
import { useAppForm, useEffect } from 'hooks/hooks';

import { SEARCH_DELAY_MS } from './common/constants';
import { SearchUserPayload } from './common/types/types';
import styles from './styles.module.scss';

type Props = {
  onSearch: (search: string) => void;
  searchParams: URLSearchParams;
};

const SearchUser: FC<Props> = ({ onSearch, searchParams }) => {
  const { errors, control, watch, setFocus } = useAppForm<SearchUserPayload>({
    defaultValues: {
      fullName: searchParams.get(SearchValue.FULLNAME) ?? '',
    },
  });

  const handleSearch = (): void => onSearch(watch(SearchValue.FULLNAME));
  const debounceHandleSearch = debounce(handleSearch, SEARCH_DELAY_MS);

  const handlePassOuterFormInputValue = (): (() => void) => {
    debounceHandleSearch();

    return () => debounceHandleSearch.clear();
  };

  useEffect(() => {
    setFocus(SearchValue.FULLNAME);
  }, []);

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
          name="fullName"
          label="fullName"
          placeholder="Search your mentor or mentee"
          inputClassName={styles.searchField}
          hasVisuallyHiddenLabel
        />
      </form>
    </div>
  );
};

export { SearchUser };
