import React, { FC } from 'react';

import { Pressable } from 'react-native';

import { AppColor } from '~/common/enums/enums';
import { Icon } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  id: number;
  onDelete: (id: number) => void;
};

const ActionCell: FC<Props> = ({ id, onDelete }) => {
  const handleDelete = (): void => {
    onDelete(id);
  };

  return (
    <Pressable onPress={handleDelete} style={styles.actionWrapper}>
      <Icon
        name="trash"
        color={AppColor.TEXT.GRAY_200}
        width={20}
        height={20}
      />
    </Pressable>
  );
};

export { ActionCell };
