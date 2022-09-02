import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily, ButtonVariant } from '~/common/enums/enums';

const styles = StyleSheet.create({
  button: {
    borderRadius: 28,
    backgroundColor: AppColor.BRAND.BLUE_100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  loaderButton: {
    paddingHorizontal: 30,
    position: 'relative',
  },
  loaderWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  loader: {
    position: 'absolute',
    left: -23,
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
});

export { styles };
