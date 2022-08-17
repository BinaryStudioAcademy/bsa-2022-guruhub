import React, { FC } from 'react';

import { Pressable, Text, View } from '~/components/common/common';
import { useState } from '~/hooks/hooks';

import { categoryKeyToImage } from '../../common/maps/maps';
import { CategoryImage } from '../category-image/category-image';
import { getRandomColor } from './helpers/get-random-color.helper';
import { styles } from './style';

type Props = {
  keyName: string;
  name: string;
  onPress: () => void;
};

const Category: FC<Props> = ({ keyName, name, onPress }) => {
  const [isActive, setIsActive] = useState(false);

  const borderColor = getRandomColor();
  const imageKeys = Object.keys(categoryKeyToImage);
  const hasImage = imageKeys.includes(keyName);

  const handlePress = (): void => {
    setIsActive(!isActive);
    onPress();
  };

  return (
    <Pressable onPress={handlePress}>
      <View
        style={{
          ...styles.container,
          ...(isActive && styles.activeItem),
          borderColor,
        }}
      >
        {hasImage ? (
          <CategoryImage name={keyName} />
        ) : (
          <Text style={{ ...styles.logoText, backgroundColor: borderColor }}>
            {name[0].toUpperCase()}
          </Text>
        )}
        <Text style={{ ...styles.text, ...(isActive && styles.activeText) }}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
};

export { Category };
