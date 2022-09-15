import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  title: {
    fontFamily: AppFontFamily.INTER_500,
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 20,
    color: AppColor.TEXT.GRAY_100,
  },
});

export { styles };
