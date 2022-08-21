import React, { FC } from 'react';

import { CategoryGetAllItemResponseDto } from '~/common/types/types';
import { ScrollView } from '~/components/common/common';
import { useEffect, useState } from '~/hooks/hooks';

import { Category } from './components/category/category';
import { styles } from './style';

type Props = {
  items: CategoryGetAllItemResponseDto[];
};

const CategoryList: FC<Props> = ({ items }) => {
  const [activeCategoryIds, setActiveCategoryIds] = useState<number[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<
    CategoryGetAllItemResponseDto[]
  >([]);

  const handlePress = (id: number): void => {
    if (!activeCategoryIds.includes(id)) {
      setActiveCategoryIds([...activeCategoryIds, id]);
    } else {
      setActiveCategoryIds(
        activeCategoryIds.filter((activeId) => activeId !== id),
      );
    }
  };

  useEffect(() => {
    if (activeCategoryIds.length) {
      const activeSet = new Set(activeCategoryIds);
      const activeItems = items.filter((item) => activeSet.has(item.id));
      const notActiveItems = items.filter((item) => !activeSet.has(item.id));

      setFilteredCategories([...activeItems, ...notActiveItems]);
    } else {
      setFilteredCategories(items);
    }
  }, [activeCategoryIds]);

  const renderCategories = filteredCategories.map((category) => (
    <Category
      key={category.id}
      name={category.name}
      keyName={category.key}
      onPress={(): void => handlePress(category.id)}
    />
  ));

  return (
    <ScrollView horizontal={true} style={styles.container}>
      {renderCategories}
    </ScrollView>
  );
};

export { CategoryList };
