import React, { FC } from 'react';

import { AppColor } from '~/common/enums/enums';
import { Icon, Pressable, View } from '~/components/common/common';
import { hitSlop } from '~/components/uam/common/constants/constants';

import { styles } from './styles';

type Props = {
  id: number;
  onDelete: (id: number) => void;
};

const ActionCell: FC<Props> = ({ id, onDelete }) => {
  const handleDelete = (): void => {
    onDelete(id);
  };

  const handleSetting = (): void => {
    // TODO: edit group functionality
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
          style={styles.iconMargin}
        />
      </Pressable>
      <Pressable style={styles.button} onPress={handleDelete}>
        <Icon
          name="trash"
          color={AppColor.TEXT.GRAY_100}
          width={20}
          height={20}
          style={styles.iconMargin}
        />
      </Pressable>
    </View>
  );
};

export { ActionCell };
