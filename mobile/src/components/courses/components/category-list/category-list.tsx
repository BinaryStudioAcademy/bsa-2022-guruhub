import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { CategoryGetAllItemResponseDto } from '~/common/types/types';
import { useState } from '~/hooks/hooks';

import { Category } from './components/category/category';
import { styles } from './style';

type Props = {
  items: CategoryGetAllItemResponseDto[];
};

const CategoryList: FC<Props> = ({ items }) => {
  const [categories, setCategories] = useState(items);

  const handlePress = (index: number): void => {
    setCategories([
      categories[index],
      ...categories.filter((item) => item.id !== categories[index].id),
    ]);
  };

  const renderCategories = categories.map((category, index) => (
    <Category
      key={category.id}
      name={category.name}
      keyName={category.key}
      onPress={(): void => handlePress(index)}
    />
  ));

  return (
    <ScrollView horizontal={true} style={styles.container}>
      {renderCategories}
    </ScrollView>
  );
};

export { CategoryList };
