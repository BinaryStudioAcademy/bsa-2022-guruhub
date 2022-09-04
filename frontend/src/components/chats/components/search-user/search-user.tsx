import { SearchValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Icon, Input } from 'components/common/common';
import { useAppForm, useEffect } from 'hooks/hooks';

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

  const handlePassOuterFormInputValue = (): void => {
    onSearch(watch(SearchValue.FULLNAME));
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
