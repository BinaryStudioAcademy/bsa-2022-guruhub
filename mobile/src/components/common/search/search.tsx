import { debounce } from 'debounce';
import React, { FC } from 'react';
import { TextInput } from 'react-native';

import { AppColor } from '~/common/enums/enums';
import { SearchInput } from '~/common/types/types';
import { Icon, View } from '~/components/common/common';
import { DEFAULT_SEARCH_TEXT } from '~/components/common/search/common/constants';
import { useAppForm, useEffect, useFormControl, useState } from '~/hooks/hooks';

import { styles } from './styles';

type Props = {
  onSearch: (text: string) => void;
};

const Search: FC<Props> = ({ onSearch }) => {
  const [borderColor, setBorderColor] = useState('transparent');

  const { watch, control } = useAppForm<SearchInput>({
    defaultValues: DEFAULT_SEARCH_TEXT,
  });

  const { field } = useFormControl({ name: 'search', control: control });
  const { value, onChange } = field;

  const watchSearchText = watch('search');

  const handleOnSearch = debounce(onSearch, 1000);

  const handleOnFocus = (): void => setBorderColor(AppColor.BRAND.BLUE_100);

  const handleOnBlur = (): void => setBorderColor('transparent');

  useEffect(() => {
    handleOnSearch(watchSearchText);

    return () => handleOnSearch.clear();
  }, [watchSearchText]);

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
      <Icon name="voice" width={12} height={18} />
    </View>
  );
};

export { Search };
