import React, { FC } from 'react';

import { View } from '~/components/common/common';

import { categoryKeyToImage } from '../../common/maps/maps';
import { styles } from './style';

type Props = {
  name: string;
  width?: number;
  height?: number;
};

const CategoryImage: FC<Props> = ({ name, width = 20, height = 20 }) => {
  const Image = categoryKeyToImage[name];

  return (
    <View style={styles.logoWrapper}>
      <Image width={width} height={height} />
    </View>
  );
};

export { CategoryImage };
