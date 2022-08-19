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
        style={styles.pressable}
        onPress={handlePreviousPageChange}
        disabled={isDisabledBack}
      >
        <View
          style={[
            styles.back,
            isDisabledBack ? styles.disabled : styles.enabled,
          ]}
        />
      </Pressable>
      <Text style={styles.textCount}>{`${currentPage} of ${totalPages}`}</Text>
      <Pressable
        style={styles.pressable}
        onPress={handleNextPageChange}
        disabled={isDisabledNext}
      >
        <View
          style={[
            styles.next,
            isDisabledNext ? styles.disabled : styles.enabled,
          ]}
        />
      </Pressable>
    </View>
  );
};

export { Pagination };
