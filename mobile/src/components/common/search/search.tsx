import { debounce } from 'debounce';
import React, { FC } from 'react';
import { TextInput } from 'react-native';

import { AppColor } from '~/common/enums/enums';
import { Icon, View } from '~/components/common/common';
import { useEffect, useState } from '~/hooks/hooks';

import { styles } from './styles';

type Props = {
  onSearch: (text: string) => void;
};

const Search: FC<Props> = ({ onSearch }) => {
  const [text, setText] = useState('');
  const [borderColor, setBorderColor] = useState('transparent');
  const handleOnSearch = debounce(onSearch, 1000);

  useEffect(() => {
    handleOnSearch(text);

    return () => handleOnSearch.clear();
  }, [text]);

  const handleChangeText = (value: string): void => setText(value);

  const handleOnFocus = (): void => setBorderColor(AppColor.BRAND.BLUE_100);

  const handleOnBlur = (): void => setBorderColor('transparent');

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
        onChangeText={handleChangeText}
        value={text}
        placeholder="Search"
        placeholderTextColor={AppColor.TEXT.GRAY_200}
      />
      <Icon name="voice" size={{ width: 12, height: 18 }} />
    </View>
  );
};

export { Search };
