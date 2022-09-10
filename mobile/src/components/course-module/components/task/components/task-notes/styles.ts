import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
  },
  title: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 20,
    lineHeight: 32,
  },
  noNotes: {
    color: AppColor.TEXT.GRAY_100,
    fontSize: 16,
    lineHeight: 32,
  },
});

export { styles };
