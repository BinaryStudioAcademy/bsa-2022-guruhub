import React, { FC } from 'react';

import { AppColor } from '~/common/enums/enums';
import { Icon, Pressable, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  id: number;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

const ActionCell: FC<Props> = ({ id, onDelete, onEdit }) => {
  const hitSlop = { top: 5, bottom: 5, left: 5, right: 5 };
  const handleDelete = (): void => {
    onDelete(id);
  };

  const handleSetting = (): void => {
    onEdit(id);
  };

  return (
    <View style={styles.container}>
      <Pressable
        hitSlop={hitSlop}
        style={styles.button}
        onPress={handleSetting}
      >
        <Icon
          name="settings"
          color={AppColor.TEXT.GRAY_100}
          width={20}
          height={20}
        />
      </Pressable>
      <Pressable style={styles.button} onPress={handleDelete}>
        <Icon
          name="trash"
          color={AppColor.TEXT.GRAY_100}
          width={20}
          height={20}
        />
      </Pressable>
    </View>
  );
};

export { ActionCell };
