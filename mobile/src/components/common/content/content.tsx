import React, { FC } from 'react';
import RenderHtml from 'react-native-render-html';

import { sanitizeHTML } from '~/helpers/helpers';

import { defaultTagsStyles, styles } from './styles';

type Props = {
  html: string;
  width: number;
};

const Content: FC<Props> = ({ html, width }) => {
  return (
    <RenderHtml
      baseStyle={styles.text}
      tagsStyles={defaultTagsStyles}
      contentWidth={width}
      source={{ html: sanitizeHTML(html) }}
    />
  );
};

export { Content };
