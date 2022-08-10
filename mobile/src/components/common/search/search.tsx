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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(text);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  const handleChangeText = (value: string): void => {
    setText(value);
  };

  const getUriSource = (name: IconName): ImageURISource => {
    if (name === 'search') {
      return require('../../../assets/img/search.png');
    }

    return require('../../../assets/img/voice.png');
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
    <View style={styles.searchBar}>
      {getIcon('search', { width: 25, height: 25 })}
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
