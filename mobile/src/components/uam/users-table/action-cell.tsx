import React, { FC } from 'react';
import { Pressable } from 'react-native';

import { AppColor } from '~/common/enums/enums';
import { Icon } from '~/components/common/common';

import { hitSlop } from '../common/constants/constants';
import { styles } from '../styles';

type Props = {
  id: number;
  onDelete: (id: number) => void;
};

const ActionCell: FC<Props> = ({ id, onDelete }) => {
  const handleDelete = (): void => {
    onDelete(id);
  };

  return (
    <Pressable
      hitSlop={hitSlop}
      onPress={handleDelete}
      style={styles.actionWrapper}
    >
      <Icon
        name="trash"
        color={AppColor.TEXT.GRAY_100}
        width={20}
        height={20}
        style={styles.iconMargin}
      />
    </Pressable>
  );
};

export { ActionCell };
