import React, { FC } from 'react';

import { CategoryGetAllItemResponseDto } from '~/common/types/types';
import { ScrollView } from '~/components/common/common';
import { useEffect, useState } from '~/hooks/hooks';

import { Category } from './components/category/category';
import { styles } from './style';

type Props = {
  items: CategoryGetAllItemResponseDto[];
  handleSelect: (id: number) => void;
  activeCategoryId: number | null;
};

const CategoryList: FC<Props> = ({ items, handleSelect, activeCategoryId }) => {
  const [filteredCategories, setFilteredCategories] = useState<
    CategoryGetAllItemResponseDto[]
  >([]);

  useEffect(() => {
    if (activeCategoryId) {
      const activeItem = items.filter((item) => item.id === activeCategoryId);
      const notActiveItems = items.filter(
        (item) => item.id !== activeCategoryId,
      );
      setFilteredCategories([...activeItem, ...notActiveItems]);
    } else {
      setFilteredCategories(items);
    }
  }, [activeCategoryId]);

  return (
    <ScrollView horizontal={true} style={styles.container}>
      {filteredCategories.map((category) => (
        <Category
          key={category.id}
          name={category.name}
          keyName={category.key}
          onPress={(): void => handleSelect(category.id)}
          isActive={category.id === activeCategoryId}
        />
      ))}
    </ScrollView>
  );
};

export { CategoryList };
