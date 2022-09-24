import React, { FC } from 'react';

import { categoryKeyToImage } from '~/common/maps/maps';
import { CategoryImage, Text, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  keyName: string;
  name: string;
};

const CourseCategory: FC<Props> = ({ keyName, name }) => {
  const imageKeys = Object.keys(categoryKeyToImage);
  const hasImage = imageKeys.includes(keyName);

  return (
    <View style={styles.container}>
      {hasImage && <CategoryImage name={keyName} width={25} height={25} />}
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

export { CourseCategory };
