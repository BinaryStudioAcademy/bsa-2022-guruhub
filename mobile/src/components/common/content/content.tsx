import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml, {
  MixedStyleDeclaration,
  MixedStyleRecord,
} from 'react-native-render-html';

import { sanitizeHTML } from '~/helpers/helpers';

import { defaultTagsStyles, styles } from './styles';

type Props = {
  html: string;
  baseStyle?: MixedStyleDeclaration;
  tagsStyles?: MixedStyleRecord;
};

const Content: FC<Props> = ({ html, baseStyle, tagsStyles }) => {
  const { width } = useWindowDimensions();

  return (
    <RenderHtml
      baseStyle={{ ...styles.text, ...baseStyle }}
      tagsStyles={{ ...defaultTagsStyles, ...tagsStyles }}
      contentWidth={width}
      source={{ html: sanitizeHTML(html) }}
    />
  );
};

export { Content };
