import React, { FC } from 'react';

import { CategoryGetAllItemResponseDto } from '~/common/types/types';
import { ScrollView } from '~/components/common/common';
import { useAppDispatch, useEffect, useState } from '~/hooks/hooks';
import { categoryActions } from '~/store/actions';

import { Category } from './components/category/category';
import { styles } from './style';

type Props = {
  items: CategoryGetAllItemResponseDto[];
};

const CategoryList: FC<Props> = ({ items }) => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [filteredCategories, setFilteredCategories] = useState<
    CategoryGetAllItemResponseDto[]
  >([]);
  const dispatch = useAppDispatch();

  const handlePress = (id: number): void => {
    if (activeCategoryId !== id) {
      setActiveCategoryId(id);
      dispatch(categoryActions.getCategoryById({ id }));
    } else {
      setActiveCategoryId(null);
      dispatch(categoryActions.clearCategory());
    }
  };

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

  const renderCategories = filteredCategories.map((category) => (
    <Category
      id={category.id}
      key={category.id}
      name={category.name}
      keyName={category.key}
      onPress={(): void => handlePress(category.id)}
      activeId={activeCategoryId}
    />
  ));

  return (
    <ScrollView horizontal={true} style={styles.container}>
      {renderCategories}
    </ScrollView>
  );
};

export { CategoryList };
