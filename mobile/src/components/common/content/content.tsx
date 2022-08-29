import React, { FC } from 'react';
import RenderHtml, { MixedStyleDeclaration } from 'react-native-render-html';

import { sanitizeHTML } from '~/helpers/helpers';

import { defaultTagsStyles, styles } from './styles';

type Props = {
  html: string;
  width: number;
  style?: MixedStyleDeclaration;
};

const Content: FC<Props> = ({ html, width, style }) => {
  return (
    <RenderHtml
      baseStyle={{ ...styles.text, ...style }}
      tagsStyles={defaultTagsStyles}
      contentWidth={width}
      source={{ html: sanitizeHTML(html) }}
    />
  );
};

export { Content };
