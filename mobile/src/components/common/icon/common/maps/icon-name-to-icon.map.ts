import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import Billing from '~/assets/icons/billing.svg';
import Book from '~/assets/icons/book.svg';
import C from '~/assets/icons/c.svg';
import CSS from '~/assets/icons/css.svg';
import Education from '~/assets/icons/education.svg';
import Home from '~/assets/icons/home.svg';
import HTML from '~/assets/icons/html.svg';
import Java from '~/assets/icons/java.svg';
import JavaScript from '~/assets/icons/javascript.svg';
import Mentors from '~/assets/icons/mentors.svg';
import Message from '~/assets/icons/message.svg';
import NodeJS from '~/assets/icons/nodejs.svg';
import Python from '~/assets/icons/python.svg';
import React from '~/assets/icons/react.svg';
import Search from '~/assets/icons/search.svg';
import Settings from '~/assets/icons/settings.svg';
import Trash from '~/assets/icons/trash.svg';
import Typescript from '~/assets/icons/typescript.svg';
import UAM from '~/assets/icons/uam.svg';
import Voice from '~/assets/icons/voice.svg';
import { IconName } from '~/common/types/ui/icon-name.type';

const iconNameToIcon: Record<IconName, FC<SvgProps>> = {
  search: Search,
  voice: Voice,
  home: Home,
  message: Message,
  education: Education,
  billing: Billing,
  mentors: Mentors,
  settings: Settings,
  book: Book,
  uam: UAM,
  trash: Trash,
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
export { iconNameToIcon };
