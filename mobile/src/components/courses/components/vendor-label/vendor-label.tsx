import React, { FC } from 'react';
import { Image, View } from 'react-native';

import { styles } from './style';

type VendorLabel = {
  vendor_name: string;
};

const VendorLabel: FC<VendorLabel> = ({ vendor_name }) => {
  const VENDOR_LOGO = {
    udemy: {
      uri: require('./assets/images/vendors_logo/udemy.png'),
    },
    coursera: {
      uri: require('./assets/images/vendors_logo/coursera.png'),
    },
  };

  let imgSource;

  switch (vendor_name.toLowerCase()) {
    case 'udemy':
      imgSource = VENDOR_LOGO.udemy.uri;
      break;
    case 'coursera':
      imgSource = VENDOR_LOGO.coursera.uri;
      break;
    default:
      break;
  }

  return (
    <>
      {vendor_name && (
        <View style={styles.container}>
          <Image style={styles.logo} source={imgSource} />
        </View>
      )}
    </>
  );
};

export { VendorLabel };
