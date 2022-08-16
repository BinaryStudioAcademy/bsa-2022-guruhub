import React, { FC } from 'react';

import { Image, Pressable, Text, View } from '~/components/common/common';
import { categoryNameToImage } from '~/components/common/maps/maps';
import { getImageUri } from '~/helpers/helpers';
import { useState } from '~/hooks/hooks';

import { getRandomColor } from './helpers/get-random-color.helper';
import { styles } from './style';

type Props = {
  imageName: string;
  name: string;
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
          <View style={styles.logoWrapper}>
            <Image
              source={{ uri: getImageUri(categoryNameToImage[imageName]) }}
              style={styles.logoImage}
            />
          </View>
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
