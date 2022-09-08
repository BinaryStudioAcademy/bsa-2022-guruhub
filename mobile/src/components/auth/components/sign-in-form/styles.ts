import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  title: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 30,
    lineHeight: 48,
    paddingTop: 20,
    paddingBottom: 20,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  buttonWrapper: {
    width: 215,
    alignSelf: 'center',
    marginTop: 10,
  },
  skipWrapper: {
    marginTop: 20,
  },
  skipText: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.BRAND.BLUE_100,
    textAlign: 'center',
  },
});

export { styles };
