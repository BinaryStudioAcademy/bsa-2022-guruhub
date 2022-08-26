import React, { FC } from 'react';

import { Pressable, Text, View } from '~/components/common/common';
import { useEffect, useState } from '~/hooks/hooks';

import { categoryKeyToImage } from '../../common/maps/maps';
import { CategoryImage } from '../category-image/category-image';
import { getRandomColor } from './helpers/get-random-color.helper';
import { styles } from './style';

type Props = {
  id: number;
  keyName: string;
  name: string;
  activeId: number | null;
  onPress: () => void;
};

const Category: FC<Props> = ({ activeId, id, keyName, name, onPress }) => {
  const [borderColor, setBorderColor] = useState('');
  const imageKeys = Object.keys(categoryKeyToImage);
  const hasImage = imageKeys.includes(keyName);

  const isActive = activeId && activeId === id;

  const handlePress = (): void => {
    onPress();
  };

  useEffect(() => {
    setBorderColor(getRandomColor());
  }, []);

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
          <View
            style={{
              ...styles.logoTextWrapper,
              backgroundColor: borderColor,
              borderColor: borderColor,
            }}
          >
            <Text style={styles.logoText}>{name[0].toUpperCase()}</Text>
          </View>
        )}
        <Text style={{ ...styles.text, ...(isActive && styles.activeText) }}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
};

export { Category };
