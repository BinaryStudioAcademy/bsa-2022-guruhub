import React, { FC, ReactElement } from 'react';

import { CategoryGetAllItemResponseDto } from '~/common/types/types';
import { FlatList } from '~/components/common/common';
import { Category } from '~/components/course/components/components';
import { useMemo, useRef } from '~/hooks/hooks';

import { styles } from './style';

type Props = {
  items: CategoryGetAllItemResponseDto[];
  handleSelect: (id: number) => void;
  activeCategoryId: number | null;
};

const CategoryList: FC<Props> = ({
  items: categories,
  handleSelect,
  activeCategoryId,
}) => {
  const categoryRef = useRef<FlatList>(null);

  const sortedCategories = useMemo((): CategoryGetAllItemResponseDto[] => {
    return categories.slice().sort((a, b) => a.key.localeCompare(b.key));
  }, [categories]);

  const handlePress = (id: number, index: number): void => {
    handleSelect(id);
    categoryRef.current?.scrollToIndex({
      animated: true,
      index: index,
    });
  };

  return (
    <FlatList
      ref={categoryRef}
      data={sortedCategories}
      keyExtractor={({ id }): string => id.toString()}
      renderItem={({ item: category, index }): ReactElement => (
        <Category
          name={category.name}
          keyName={category.key}
          onPress={(): void => handlePress(category.id, index)}
          isActive={category.id === activeCategoryId}
        />
      )}
      style={styles.container}
      horizontal={true}
    />
  );
};

export { CategoryList };
