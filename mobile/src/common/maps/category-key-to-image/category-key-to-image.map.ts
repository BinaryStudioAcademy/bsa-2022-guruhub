import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import C from '~/assets/images/categories/c.svg';
import CSS from '~/assets/images/categories/css.svg';
import HTML from '~/assets/images/categories/html.svg';
import Java from '~/assets/images/categories/java.svg';
import JavaScript from '~/assets/images/categories/javascript.svg';
import NodeJS from '~/assets/images/categories/nodejs.svg';
import Python from '~/assets/images/categories/python.svg';
import React from '~/assets/images/categories/react.svg';
import Typescript from '~/assets/images/categories/typescript.svg';

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
