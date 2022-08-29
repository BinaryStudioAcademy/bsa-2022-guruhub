import React, { FC } from 'react';

import { categoryKeyToImage } from '~/common/maps/maps';
import { CategoryGetAllItemResponseDto } from '~/common/types/types';
import { CategoryImage, Text, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  category: CategoryGetAllItemResponseDto;
};

const CategoryCell: FC<Props> = ({ category }) => {
  const imageKeys = Object.keys(categoryKeyToImage);
  const hasImage = imageKeys.includes(category.key);

  return (
    <View style={styles.categoryCell}>
      {hasImage ? (
        <CategoryImage name={category.key} width={24} height={24} />
      ) : (
        <View style={styles.withoutImgTextWrp}>
          <Text style={styles.withoutImgText}>
            {category.name[0].toUpperCase()}
          </Text>
        </View>
      )}
      <Text style={styles.categoryName}>{category.name}</Text>
    </View>
  );
};

export { CategoryCell };
