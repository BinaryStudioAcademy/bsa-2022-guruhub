import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily, ButtonVariant } from '~/common/enums/enums';

const styles = StyleSheet.create({
  button: {
    borderRadius: 28,
    backgroundColor: AppColor.BRAND.BLUE_100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
    minWidth: 120,
    minHeight: 40,
  },
  buttonSmall: {
    paddingVertical: 8,
  },
  buttonLarge: {
    paddingVertical: 16,
  },
  loaderWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  loader: {
    position: 'absolute',
    left: 5,
  },
  label: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  [`button${ButtonVariant.PRIMARY}`]: {
    backgroundColor: AppColor.BRAND.BLUE_100,
  },
  [`button${ButtonVariant.PRIMARY}Label`]: {
    color: AppColor.TEXT.GRAY_100,
  },
  [`button${ButtonVariant.SECONDARY}`]: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: AppColor.BRAND.BLUE_100,
  },
  [`button${ButtonVariant.SECONDARY}Label`]: {
    color: AppColor.BRAND.BLUE_100,
  },
  [`button${ButtonVariant.CANCEL}`]: {
    backgroundColor: AppColor.BACKGROUND.GRAY_200,
  },
  [`button${ButtonVariant.CANCEL}Label`]: {
    color: AppColor.TEXT.GRAY_100,
  },
  [`button${ButtonVariant.CARD}`]: {
    color: AppColor.BRAND.BLUE_100,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    height: 75,
  },
  [`button${ButtonVariant.CARD}Label`]: {
    color: AppColor.TEXT.GRAY_100,
    fontSize: 24,
  },
});

export { styles };
