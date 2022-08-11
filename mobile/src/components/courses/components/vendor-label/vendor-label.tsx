import React, { FC } from 'react';

import { VendoLabelCoursera, VendoLabelUdemy } from './vendor-labels';

type Props = {
  vendor_name: string;
};

const VendorLabel: FC<Props> = ({ vendor_name }) => {
  switch (vendor_name.toLocaleLowerCase()) {
    case 'udemy': {
      return <VendoLabelUdemy />;
    }
    case 'coursera': {
      return <VendoLabelCoursera />;
    }
  }

  return null;
};

export { VendorLabel };
