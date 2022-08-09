import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
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
  circle_1: {
    position: 'absolute',
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: AppColor.BRAND.BLUE_100,
    bottom: 147,
    left: -34,
  },
  circle_2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: AppColor.BRAND.BLUE_100,
    top: -65,
    right: -43,
  },
});

export { styles };
