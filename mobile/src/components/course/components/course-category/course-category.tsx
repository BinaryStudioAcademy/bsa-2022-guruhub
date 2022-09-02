import React, { FC } from 'react';

import { categoryKeyToImage } from '~/common/maps/maps';
import { Pressable, Text, View } from '~/components/common/common';
import { useEffect, useState } from '~/hooks/hooks';

import { CategoryImage } from './components/components';
import { getRandomColor } from './helpers/get-random-color.helper';
import { styles } from './style';

type Props = {
  keyName: string;
  name: string;
  onPress?: () => void;
  isActive: boolean;
};

const CourseCategory: FC<Props> = ({ isActive, keyName, name, onPress }) => {
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
        style={
          color
            ? {
                ...styles.categoryListContainer,
                ...(isActive && styles.activeItem),
                borderColor: color,
              }
            : styles.container
        }
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

export { CourseCategory };
