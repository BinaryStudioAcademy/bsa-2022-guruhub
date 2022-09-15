import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  titleWrapper: {},
  title: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 16,
    lineHeight: 20,
    color: AppColor.TEXT.GRAY_200,
  },
});

export { styles };
