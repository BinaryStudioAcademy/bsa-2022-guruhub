import { CategoryGetAllItemResponseDto } from 'guruhub-shared/common/types/types';
import React, { FC, ReactElement } from 'react';

import { Text, View } from '~/components/common/common';
import { categoryKeyToImage } from '~/components/courses/components/category-list/common/maps/category-key-to-image.map';

import { styles } from './styles';

type Props = {
  category: CategoryGetAllItemResponseDto;
};

const CategoryCell: FC<Props> = ({ category }) => {
  const renderCategoryImage = (categoryKey: string): ReactElement => {
    const Image = categoryKeyToImage[categoryKey];

    return <Image width={24} height={24} />;
  };

  return (
    <View style={styles.categoryCell}>
      {category.key in categoryKeyToImage && renderCategoryImage(category.key)}
      <Text style={styles.categoryName}>{category.name}</Text>
    </View>
  );
};

export { CategoryCell };
