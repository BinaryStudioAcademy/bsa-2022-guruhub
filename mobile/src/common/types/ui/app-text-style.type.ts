import { TextStyle as UITextStyle } from 'react-native';

import { AppFontFamily } from '~/common/enums/enums';

type TextStyle = UITextStyle & {
  fontFamily?: AppFontFamily;
};

type AppTextStyle = Omit<TextStyle, 'fontWeight' | 'fontStyle'>;

export { type AppTextStyle };
