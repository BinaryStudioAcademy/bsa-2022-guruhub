import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 20,
    lineHeight: 32,
  },
  noTask: {
    padding: 20,
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 20,
    lineHeight: 32,
  },
});

export { styles };
