import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  text1: {
    fontFamily: AppFontFamily.INTER_400,
    fontSize: 16,
    color: AppColor.TEXT.GRAY_400,
  },

  text2: {
    fontFamily: AppFontFamily.INTER_400,
    fontSize: 14,
  },

  error: {
    height: '100%',
    paddingVertical: 10,
    borderLeftColor: AppColor.SUPPORT.ERROR_RED_100,
    backgroundColor: '#FBDDDD',
  },

  errorText2: {
    color: AppColor.SUPPORT.ERROR_RED_100,
  },

  info: {
    height: '100%',
    paddingVertical: 10,
    borderLeftColor: AppColor.SUPPORT.INFO_BLUE_100,
    backgroundColor: '#D5E6FB',
  },

  infoText2: {
    color: AppColor.SUPPORT.INFO_BLUE_100,
  },

  success: {
    height: '100%',
    paddingVertical: 10,
    borderLeftColor: AppColor.BRAND.GREEN_100,
    backgroundColor: '#E2F5EA',
  },

  successText2: {
    color: AppColor.BRAND.GREEN_100,
  },
});

export { styles };
