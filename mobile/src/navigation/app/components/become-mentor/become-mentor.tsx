import React, { FC } from 'react';

import saly from '~/assets/images/saly.png';
import { Button, Image, View } from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';

import { styles } from './styles';

type Props = {
  onPress: () => void;
};

const BecomeMentor: FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.footer}>
      <Image style={styles.footerImage} source={{ uri: getImageUri(saly) }} />
      <Button label="Become A Mentor" onPress={onPress} />
    </View>
  );
};

export { BecomeMentor };
