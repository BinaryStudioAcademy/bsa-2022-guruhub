import React, { FC } from 'react';

import { Content, Pressable, Text, View } from '~/components/common/common';
import { CourseDescriptionFirstCharsCount } from '~/components/course/common/constants/constants';
import { getTextWithoutHTMLTags } from '~/helpers/helpers';

import { styles } from './styles';

type Props = {
  description: string;
  isExpanded: boolean;
  handleExpandedToggle: () => void;
  width: number;
};

const CourseDescription: FC<Props> = ({
  description,
  handleExpandedToggle,
  isExpanded,
  width,
}) => {
  const isTogglerShown =
    description.length > CourseDescriptionFirstCharsCount.DEFAULT_COUNT;

  const textShortDescription = `${getTextWithoutHTMLTags(description).slice(
    0,
    CourseDescriptionFirstCharsCount.DEFAULT_COUNT,
  )}...`;

  const pressableText = `See ${isExpanded ? 'less' : 'more'}`;

  return (
    <View>
      <Content
        html={isExpanded ? description : textShortDescription}
        width={width}
      />
      {isTogglerShown && (
        <Pressable onPress={handleExpandedToggle} style={styles.pressable}>
          <Text style={styles.seeMore}>{pressableText}</Text>
        </Pressable>
      )}
    </View>
  );
};

export { CourseDescription };
