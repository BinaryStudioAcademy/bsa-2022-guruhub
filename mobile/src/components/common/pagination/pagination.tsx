import React, { FC } from 'react';

import { Pressable, Text, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: FC<Props> = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);
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
        onPress={handlePreviousPageChange}
        disabled={isDisabledBack}
      />
      <Text style={styles.textCount}>{`${currentPage} of ${totalPages}`}</Text>
      <Pressable
        style={[styles.next, isDisabledNext ? styles.disabled : styles.enabled]}
        onPress={handleNextPageChange}
        disabled={isDisabledNext}
      />
    </View>
  );
};

export { Pagination };
