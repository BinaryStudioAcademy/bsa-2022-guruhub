import React, { FC, ReactElement } from 'react';

import { categoryKeyToImage } from '~/common/maps/maps';
import { CategoryGetAllItemResponseDto } from '~/common/types/types';
import { Text, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  category: CategoryGetAllItemResponseDto;
};

const CategoryCell: FC<Props> = ({ category }) => {
  const renderCategoryImage = (categoryKey: string): ReactElement => {
    const Image = categoryKeyToImage[categoryKey];

    return <Image width={24} height={24} />;
  };

  const renderDefaultCategoryImage = (categoryName: string): ReactElement => {
    return (
      <View style={styles.withoutImgTextWrp}>
        <Text style={styles.withoutImgText}>
          {categoryName[0].toUpperCase()}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.categoryCell}>
      {category.key in categoryKeyToImage
        ? renderCategoryImage(category.key)
        : renderDefaultCategoryImage(category.name)}
      <Text style={styles.categoryName}>{category.name}</Text>
    </View>
  );
};

export { CategoryCell };
