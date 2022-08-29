import React, { FC, ReactElement } from 'react';

import { CategoryGetAllItemResponseDto } from '~/common/types/types';
import { FlatList } from '~/components/common/common';
import { useRef } from '~/hooks/hooks';

import { Category } from './components/category/category';
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
      data={categories}
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
