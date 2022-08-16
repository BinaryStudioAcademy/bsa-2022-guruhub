import { ImageSourcePropType } from 'react-native';

import C from '~/assets/images/c.png';
import CSS from '~/assets/images/css.png';
import HTML from '~/assets/images/html.png';
import Java from '~/assets/images/java.png';
import Javascript from '~/assets/images/javascript.png';
import NodeJS from '~/assets/images/nodejs.png';
import Python from '~/assets/images/python.png';
import React from '~/assets/images/react.png';
import Typescript from '~/assets/images/typescript.png';
import { CourseImageName } from '~/common/types/types';

const categoryNameToImage: Record<
  CourseImageName | string,
  ImageSourcePropType
> = {
  c: C,
  css: CSS,
  html: HTML,
  java: Java,
  javascript: Javascript,
  nodejs: NodeJS,
  python: Python,
  react: React,
  typescript: Typescript,
};

export { categoryNameToImage };
