import React, { FC } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { Pressable, Text, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const hitSlop = { top: 20, bottom: 20, left: 20, right: 20 };

const Pagination: FC<Props> = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const totalPages = !totalCount
    ? PaginationDefaultValue.DEFAULT_PAGE
    : Math.ceil(totalCount / pageSize);
  const isDisabledBack = currentPage === 1;
  const isDisabledNext = currentPage === totalPages;

  const handleNextPageChange = (): void => {
    onPageChange(currentPage + 1);
  };

  const handlePreviousPageChange = (): void => {
    onPageChange(currentPage - 1);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.back, isDisabledBack ? styles.disabled : styles.enabled]}
        hitSlop={hitSlop}
        onPress={handlePreviousPageChange}
        disabled={isDisabledBack}
      />
      <Text style={styles.textCount}>{`${currentPage} of ${totalPages}`}</Text>
      <Pressable
        style={[styles.next, isDisabledNext ? styles.disabled : styles.enabled]}
        hitSlop={hitSlop}
        onPress={handleNextPageChange}
        disabled={isDisabledNext}
      />
    </View>
  );
};

export { Pagination };
