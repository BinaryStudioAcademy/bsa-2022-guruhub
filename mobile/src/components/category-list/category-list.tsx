import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { CategoryGetAllItemResponseDto } from '~/common/types/types';
import { useState } from '~/hooks/hooks';

import { Category } from './components/category/category';

type Props = {
  items: CategoryGetAllItemResponseDto[];
};

const CategoryList: FC<Props> = ({ items }) => {
  const [categories, setCategories] = useState(items);

  const handlePress = (index: number): void => {
    setCategories([...categories.slice(index), ...categories.slice(0, index)]);
  };

  const renderCategories = categories.map((category, index) => (
    <Category
      key={category.id}
      name={category.name}
      imageName={category.key}
      onPress={(): void => handlePress(index)}
    />
  ));

  return <ScrollView horizontal={true}>{renderCategories}</ScrollView>;
};

export { CategoryList };
