import React, { FC } from 'react';

import { CourseDescriptionFirstWordsCount } from '~/common/enums/enums';
import { Content, Pressable, Text, View } from '~/components/common/common';
import {
  getTextWithoutHTMLTags,
  getWordsCountFromString,
} from '~/helpers/helpers';

import { styles } from './styles';

type Props = {
  description: string;
  handleSeeMore: () => void;
  width: number;
};

const CourseShortDescription: FC<Props> = ({
  description,
  handleSeeMore,
  width,
}) => {
  const textDescription = getWordsCountFromString(
    CourseDescriptionFirstWordsCount.DEFAULT_COUNT,
    getTextWithoutHTMLTags(description),
  );

  return (
    <View>
      <Content html={textDescription} width={width} />
      <Pressable onPress={handleSeeMore} style={styles.pressable}>
        <Text style={styles.seeMore}>See more</Text>
      </Pressable>
    </View>
  );
};

export { CourseShortDescription };
