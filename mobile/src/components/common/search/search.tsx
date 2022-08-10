import React, { FC } from 'react';
import { ImageURISource, TextInput, TouchableOpacity } from 'react-native';

import search from '~/assets/images/search.png';
import voice from '~/assets/images/voice.png';
import { AppColor } from '~/common/enums/enums';
import { Image, View } from '~/components/common/common';
import { useEffect, useState } from '~/hooks/hooks';

import { styles } from './styles';

type Props = {
  onSearch: (text: string) => void;
  onVoice?: () => Promise<string>;
};

type IconSize = {
  width: number;
  height: number;
};

type IconName = 'search' | 'voice';

const Search: FC<Props> = ({ onSearch, onVoice }) => {
  const [text, setText] = useState('');
  const [borderColor, setBorderColor] = useState('transparent');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(text);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  const handleChangeText = (value: string): void => {
    setText(value);
  };

  const handleVoicePress = async (): Promise<void> => {
    if (onVoice) {
      handleChangeText(await onVoice());
    }
  };

  const getUriSource = (name: IconName): ImageURISource => {
    if (name === 'search') {
      return search;
    }

    return voice;
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
        onFocus={(): void => setBorderColor(AppColor.BRAND.BLUE_100)}
        onBlur={(): void => setBorderColor('transparent')}
        autoComplete="off"
        autoCorrect={false}
        onChangeText={handleChangeText}
        value={text}
        placeholder="Search"
        placeholderTextColor={AppColor.TEXT.GRAY_200}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!onVoice}
        onPress={handleVoicePress}
      >
        {getIcon('voice', { width: 12, height: 18 })}
      </TouchableOpacity>
    </View>
  );
};

export { Search };
