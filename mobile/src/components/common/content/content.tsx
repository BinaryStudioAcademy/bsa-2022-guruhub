import React, { FC } from 'react';
import RenderHtml from 'react-native-render-html';

import { sanitizeHTML } from '~/helpers/helpers';
import { useWindowDimensions } from '~/hooks/hooks';

import { defaultTagsStyles, styles } from './styles';

type Props = {
  html: string;
  contentWidth?: number;
};

const Content: FC<Props> = ({ html, contentWidth }) => {
  const { width } = useWindowDimensions();

  return (
    <RenderHtml
      baseStyle={styles.text}
      tagsStyles={defaultTagsStyles}
      contentWidth={contentWidth ?? width}
      source={{ html: sanitizeHTML(html) }}
    />
  );
};

export { Content };
