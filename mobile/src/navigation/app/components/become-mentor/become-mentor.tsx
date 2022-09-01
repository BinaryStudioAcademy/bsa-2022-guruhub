import React, { FC } from 'react';

import saly from '~/assets/images/saly.png';
import { DataStatus } from '~/common/enums/enums';
import { Button, Image, Spinner, View } from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';

import { styles } from './styles';

type Props = {
  dataStatus: DataStatus;
  onPress: () => void;
};

const BecomeMentor: FC<Props> = ({ onPress, dataStatus }) => {
  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <View style={styles.footer}>
      <Image style={styles.footerImage} source={{ uri: getImageUri(saly) }} />
      <Button label="Become A Mentor" onPress={onPress} />
    </View>
  );
};

export { BecomeMentor };
