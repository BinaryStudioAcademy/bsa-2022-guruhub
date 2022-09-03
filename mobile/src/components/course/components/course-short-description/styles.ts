import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  description: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_400,
    fontSize: 14,
    lineHeight: 19.5,
  },
  pressable: {
    paddingTop: 5,
    paddingRight: 10,
    alignSelf: 'flex-end',
  },
  seeMore: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.BRAND.BLUE_100,
    fontSize: 16,
    lineHeight: 20,
  },
});

export { styles };
