import React, { FC } from 'react';

import { categoryKeyToImage } from '~/common/maps/maps';
import { CategoryImage, Text, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  keyName: string;
  name: string;
  color?: string;
  isActive?: boolean;
};

const Category: FC<Props> = ({ keyName, name, color, isActive }) => {
  const imageKeys = Object.keys(categoryKeyToImage);
  const hasImage = imageKeys.includes(keyName);

  return (
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
  );
};

export { Category };
