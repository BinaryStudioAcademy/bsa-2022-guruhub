import { FC } from 'common/types/types';
import { useState } from 'hooks/hooks';
import { coursesApi } from 'services/services';

import styles from './styles.module.scss';

const SearchBar: FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
    coursesApi.getByName(event.target.value);
  };

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        className={styles.searchfield}
        placeholder="Search or type"
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export { SearchBar };
