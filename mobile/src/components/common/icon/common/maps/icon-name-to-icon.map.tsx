import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import Billing from '~/assets/icons/billing.svg';
import Book from '~/assets/icons/book.svg';
import Education from '~/assets/icons/education.svg';
import Home from '~/assets/icons/home.svg';
import Mentors from '~/assets/icons/mentors.svg';
import Message from '~/assets/icons/message.svg';
import Search from '~/assets/icons/search.svg';
import Settings from '~/assets/icons/settings.svg';
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
};
export { iconNameToIcon };
