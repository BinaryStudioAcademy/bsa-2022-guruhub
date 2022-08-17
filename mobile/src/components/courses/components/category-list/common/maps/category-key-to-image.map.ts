import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import C from '~/assets/icons/c.svg';
import CSS from '~/assets/icons/css.svg';
import HTML from '~/assets/icons/html.svg';
import Java from '~/assets/icons/java.svg';
import JavaScript from '~/assets/icons/javascript.svg';
import NodeJS from '~/assets/icons/nodejs.svg';
import Python from '~/assets/icons/python.svg';
import React from '~/assets/icons/react.svg';
import Typescript from '~/assets/icons/typescript.svg';

const categoryKeyToImage: Record<string, FC<SvgProps>> = {
  c: C,
  css: CSS,
  html: HTML,
  java: Java,
  javascript: JavaScript,
  nodejs: NodeJS,
  python: Python,
  react: React,
  typescript: Typescript,
};

export { categoryKeyToImage };
