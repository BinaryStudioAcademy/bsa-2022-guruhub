import React, { FC } from 'react';

import { CourseImageName } from '~/common/types/types';
import { Image, Pressable, Text, View } from '~/components/common/common';
import { categoryNameToImage } from '~/components/common/maps/maps';
import { useState } from '~/hooks/hooks';

import { getRandomColor } from './helpers/get-random-color.helper';
import { styles } from './style';

type Props = {
  imageName: string;
  name: string | CourseImageName;
  onPress: () => void;
};

const Category: FC<Props> = ({ imageName, name, onPress }) => {
  const [isActive, setIsActive] = useState(false);
  const borderColor = getRandomColor();

  const imageKeys = Object.keys(categoryNameToImage);
  const hasImage = imageKeys.includes(imageName);

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
          borderColor: borderColor,
        }}
      >
        {hasImage ? (
          <Image source={{ uri: `~/assets/images/${imageName}.png` }} />
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
