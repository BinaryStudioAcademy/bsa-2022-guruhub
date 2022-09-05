import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import Billing from '~/assets/icons/billing.svg';
import Book from '~/assets/icons/book.svg';
import Edit from '~/assets/icons/edit.svg';
import Education from '~/assets/icons/education.svg';
import Home from '~/assets/icons/home.svg';
import Interview from '~/assets/icons/interview.svg';
import Mentors from '~/assets/icons/mentors.svg';
import Message from '~/assets/icons/message.svg';
import Plus from '~/assets/icons/plus.svg';
import Save from '~/assets/icons/save.svg';
import Search from '~/assets/icons/search.svg';
import Settings from '~/assets/icons/settings.svg';
import Trash from '~/assets/icons/trash.svg';
import UAM from '~/assets/icons/uam.svg';
import Visibility from '~/assets/icons/visibility.svg';
import VisibilityOff from '~/assets/icons/visibility-off.svg';
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
  plus: Plus,
  edit: Edit,
  save: Save,
  interview: Interview,
  visibility: Visibility,
  visibilityOff: VisibilityOff,
};
export { iconNameToIcon };
