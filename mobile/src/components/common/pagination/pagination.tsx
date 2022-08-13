import React, { FC, ReactElement } from 'react';

import { Button, Text, View } from '~/components/common/common';

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
}): ReactElement => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleNextPageChange = (): void => {
    onPageChange(currentPage + 1);
  };

  const handlePreviousPageChange = (): void => {
    onPageChange(currentPage - 1);
  };

  return (
    <View style={styles.container}>
      <Button
        label="<"
        onPress={handlePreviousPageChange}
        disabled={currentPage === 1}
      />
      <Text>
        {' '}
        {currentPage} of {totalPages}{' '}
      </Text>
      <Button
        label=">"
        onPress={handleNextPageChange}
        disabled={currentPage === totalPages}
      />
    </View>
  );
};

export { Pagination };
