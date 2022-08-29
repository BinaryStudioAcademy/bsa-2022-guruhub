import React, { FC } from 'react';

import { Pressable, Text, View } from '~/components/common/common';
import { CategoryImage } from '~/components/course/components/category/components/components';
import { useEffect, useState } from '~/hooks/hooks';

import { categoryKeyToImage } from './common/maps/maps';
import { getRandomColor } from './helpers/get-random-color.helper';
import { styles } from './style';

type Props = {
  keyName: string;
  name: string;
  onPress?: () => void;
  isActive: boolean;
};

const Category: FC<Props> = ({ isActive, keyName, name, onPress }) => {
  const [color, setColor] = useState('');
  const imageKeys = Object.keys(categoryKeyToImage);
  const hasImage = imageKeys.includes(keyName);

  const handlePress = (): void => {
    onPress?.();
  };

  useEffect(() => {
    setColor(getRandomColor());
  }, []);

  return (
    <Pressable onPress={handlePress}>
      <View
        style={{
          ...styles.container,
          ...(isActive && styles.activeItem),
          borderColor: color,
        }}
      >
        {hasImage ? (
          <CategoryImage name={keyName} />
        ) : (
          <View
            style={{
              ...styles.logoTextWrapper,
              backgroundColor: color,
              borderColor: color,
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
