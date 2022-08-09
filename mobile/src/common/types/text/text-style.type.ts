import { TextStyle as UITextStyle } from 'react-native';
import { AppFontFamily } from '~/common/enums/enums';

type Text = UITextStyle & {
  fontFamily?: AppFontFamily;
};

type TextStyle = Omit<Text, 'fontWeight' | 'fontStyle'>;

export { type TextStyle };
