import React, { FC } from 'react';

import { Content, Pressable, Text, View } from '~/components/common/common';
import { COURSE_SHORT_DESCRIPTION_LENGTH } from '~/components/course/common/constants/constants';
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
  const isTogglerShown = description.length > COURSE_SHORT_DESCRIPTION_LENGTH;

  const textShortDescription = `${getTextWithoutHTMLTags(description).slice(
    0,
    COURSE_SHORT_DESCRIPTION_LENGTH,
  )}${isTogglerShown ? '...' : ''}`;

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
