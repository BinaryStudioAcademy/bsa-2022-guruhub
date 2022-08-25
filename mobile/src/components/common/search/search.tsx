import React, { FC } from 'react';
import { TextInput } from 'react-native';

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
  useFormControl,
  useState,
} from '~/hooks/hooks';

import { SearchPayload } from './common/types';
import { styles } from './styles';

type Props = {
  onSearch: (text: string) => void;
};

const Search: FC<Props> = ({ onSearch }) => {
  const [borderColor, setBorderColor] = useState('transparent');

  const { control, reset } = useAppForm<SearchPayload>({
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
  });

  const { field } = useFormControl({ name: 'search', control: control });
  const { value, onChange } = field;

  const handleSearch = (): void => onSearch(value);

  const debounceHandleSearch = debounce(handleSearch, SEARCH_DELAY_MS);

  const handleOnFocus = (): void => setBorderColor(AppColor.BRAND.BLUE_100);

  const handleOnBlur = (): void => setBorderColor('transparent');

  useEffect(() => {
    debounceHandleSearch();

    return () => debounceHandleSearch.clear();
  }, [value]);

  useFocusEffect(
    useCallback(() => {
      return () => reset(DEFAULT_SEARCH_PAYLOAD);
    }, []),
  );

  return (
    <View style={{ ...styles.searchBar, borderColor: borderColor }}>
      <Icon name="search" />
      <TextInput
        selectionColor={AppColor.TEXT.GRAY_200}
        style={styles.search}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        autoComplete="off"
        autoCorrect={false}
        onChangeText={onChange}
        value={value}
        placeholder="Search"
        placeholderTextColor={AppColor.TEXT.GRAY_200}
      />
    </View>
  );
};

export { Search };
