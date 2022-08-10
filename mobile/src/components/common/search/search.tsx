import React, { FC } from 'react';
import { TextInput } from 'react-native';

import { AppColor } from '~/common/enums/enums';
import { View } from '~/components/common/common';
import { useEffect, useState } from '~/hooks/hooks';

import { styles } from './styles';

type Props = {
  onSearch: (text: string) => void;
};

const Search: FC<Props> = ({ onSearch }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(text);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  const handleChangeText = (value: string): void => {
    setText(value);
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.search}
        autoComplete="off"
        autoCorrect={false}
        inlineImageLeft="search_icon"
        inlineImagePadding={10}
        onChangeText={handleChangeText}
        value={text}
        placeholder="Search"
        placeholderTextColor={AppColor.TEXT.GRAY_200}
      />
    </View>
  );
};

export { Search };
