import { CategoryGetAllItemResponseDto } from 'guruhub-shared/common/types/types';
import React, { FC, ReactElement } from 'react';

import { categoryKeyToImage } from '~/common/maps/maps';
import { Text, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  category: CategoryGetAllItemResponseDto;
};

const CategoryCell: FC<Props> = ({ category }) => {
  const renderCategoryImage = (categoryKey: string): ReactElement => {
    if (category.key in categoryKeyToImage) {
      const Image = categoryKeyToImage[categoryKey];

      return <Image width={24} height={24} />;
    }

    return (
      <View style={styles.withoutImgTextWrp}>
        <Text style={styles.withoutImgText}>
          {category.name[0].toUpperCase()}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.categoryCell}>
      {renderCategoryImage(category.key)}
      <Text style={styles.categoryName}>{category.name}</Text>
    </View>
  );
};

export { CategoryCell };
