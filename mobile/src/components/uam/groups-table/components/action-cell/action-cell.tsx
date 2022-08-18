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
  const handleDelete = (): void => {
    onDelete(id);
  };

  const handleSetting = (): void => {
    onEdit(id);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleSetting}>
        <Icon
          name="settings"
          color={AppColor.BRAND.YELLOW_200}
          width={20}
          height={20}
        />
      </Pressable>
      <Pressable style={styles.button} onPress={handleDelete}>
        <Icon
          name="trash"
          color={AppColor.BRAND.YELLOW_200}
          width={20}
          height={20}
        />
      </Pressable>
    </View>
  );
};

export { ActionCell };
