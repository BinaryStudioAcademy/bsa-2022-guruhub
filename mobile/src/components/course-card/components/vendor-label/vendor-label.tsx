import React, { FC } from 'react';

import { View } from '~/components/common/common';
import { vendorsKeyToImage } from '~/components/course-card/common/maps/maps';

import { styles } from './style';

type Props = {
  vendorKey: string;
};

const VendorLabel: FC<Props> = ({ vendorKey }) => {
  const Image = vendorsKeyToImage[vendorKey];

  return (
    <View style={styles.container}>
      <Image style={styles.logo} />
    </View>
  );
};

export { VendorLabel };
