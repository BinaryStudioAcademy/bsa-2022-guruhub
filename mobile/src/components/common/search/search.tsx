import React, { FC } from 'react';

import { AppColor } from '~/common/enums/enums';
import { Icon, View } from '~/components/common/common';
import {
  DEFAULT_SEARCH_PAYLOAD,
  SEARCH_DELAY_MS,
} from '~/components/common/search/common/constants';
import { debounce } from '~/helpers/helpers';
import {
  useAppForm,
  useCallback,
  useEffect,
  useFocusEffect,
  useState,
} from '~/hooks/hooks';

import { SearchPayload } from './common/types';
import { SearchInput } from './components/components';
import { styles } from './styles';

type Props = {
  onSearch: (text: string) => void;
};

const Search: FC<Props> = ({ onSearch }) => {
  const [borderColor, setBorderColor] = useState('transparent');

  const { control, reset, watch } = useAppForm<SearchPayload>({
    mode: 'onChange',
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
  });

  const handleSearch = (): void => onSearch(watch('search'));

  const debounceHandleSearch = debounce(handleSearch, SEARCH_DELAY_MS);

  const handleOnFocus = (): void => setBorderColor(AppColor.BRAND.BLUE_100);

  const handleOnBlur = (): void => setBorderColor('transparent');

  useEffect(() => {
    debounceHandleSearch();

    return () => debounceHandleSearch.clear();
  }, [watch('search')]);

  useFocusEffect(
    useCallback(() => {
      return () => reset(DEFAULT_SEARCH_PAYLOAD);
    }, []),
  );

  return (
    <View style={{ ...styles.searchBar, borderColor: borderColor }}>
      <Icon name="search" />
      <SearchInput
        control={control}
        name="search"
        onChange={debounceHandleSearch}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
      />
    </View>
  );
};

export { Search };
