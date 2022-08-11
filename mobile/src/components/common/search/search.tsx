import { debounce } from 'debounce';
import React, { FC } from 'react';
import { ImageURISource, TextInput } from 'react-native';

import { AppColor } from '~/common/enums/enums';
import { Image, View } from '~/components/common/common';
import { useEffect, useState } from '~/hooks/hooks';

import { styles } from './styles';

type Props = {
  onSearch: (text: string) => void;
};

type IconSize = {
  width: number;
  height: number;
};

type IconName = 'search' | 'voice';

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

  const getUriSource = (name: IconName): ImageURISource => {
    if (name === 'search') {
      return require('~/assets/images/search.png');
    }

    return require('~/assets/images/voice.png');
  };

  const getIcon = (name: IconName, size: IconSize): JSX.Element => {
    return (
      <Image
        source={Image.resolveAssetSource(getUriSource(name))}
        style={{ width: size.width, height: size.height }}
      />
    );
  };

  return (
    <View style={{ ...styles.searchBar, borderColor: borderColor }}>
      {getIcon('search', { width: 16, height: 16 })}
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
      {getIcon('voice', { width: 12, height: 18 })}
    </View>
  );
};

export { Search };
