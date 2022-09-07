import React, { FC } from 'react';
import { Pressable } from 'react-native';

import { AppColor } from '~/common/enums/enums';
import { Icon } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  categoryId: number;
  onEdit: (categoryId: number) => void;
};

const ActionCell: FC<Props> = ({ categoryId, onEdit }) => {
  const hitSlop = { top: 5, bottom: 5, left: 5, right: 5 };

  const handleEdit = (): void => {
    onEdit(categoryId);
  };

  return (
    <Pressable
      hitSlop={hitSlop}
      onPress={handleEdit}
      style={styles.actionWrapper}
    >
      <Icon name="edit" color={AppColor.TEXT.GRAY_100} width={20} height={20} />
    </Pressable>
  );
};

export { ActionCell };
