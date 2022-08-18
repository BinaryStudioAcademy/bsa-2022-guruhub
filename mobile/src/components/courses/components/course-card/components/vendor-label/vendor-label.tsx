import React, { FC } from 'react';

import { View } from '~/components/common/common';
import { vendorsKeyToImage } from '~/components/courses/components/course-card/common/map/maps';

import { styles } from './style';

type Props = {
  vendorName: string;
};

const VendorLabel: FC<Props> = ({ vendorName }) => {
  const Image = vendorsKeyToImage[vendorName.toLowerCase()];

  return (
    <View style={styles.container}>
      <Image style={styles.logo} />
    </View>
  );
};

export { VendorLabel };
