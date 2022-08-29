import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  categoryCell: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  categoryName: {
    color: AppColor.TEXT.GRAY_100,
    paddingLeft: 5,
  },
  withoutImgText: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 16,
    lineHeight: 19,
  },
  withoutImgTextWrp: {
    width: 24,
    height: 24,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: AppColor.BRAND.BLUE_100,
    justifyContent: 'center',
  },
});

export { styles };
