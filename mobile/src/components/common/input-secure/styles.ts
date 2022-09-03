import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  input: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 15,
    lineHeight: 24,
    color: AppColor.TEXT.GRAY_100,
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: AppColor.BACKGROUND.GRAY_300,
    paddingStart: 15,
    paddingEnd: 60,
    paddingTop: 7,
    paddingBottom: 7,
  },
  label: {
    fontFamily: AppFontFamily.INTER_500,
    fontSize: 14,
    lineHeight: 16,
    paddingBottom: 9,
    color: AppColor.TEXT.GRAY_100,
  },
  error: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 12,
    lineHeight: 16,
    color: AppColor.SUPPORT.ERROR_RED_100,
    marginTop: 9,
  },
  button: {
    justifyContent: 'center',
    height: 30,
    paddingLeft: 10,
    paddingRight: 20,
    marginTop: -14,
    position: 'absolute',
    top: '50%',
    right: 0,
  },
});

export { styles };
