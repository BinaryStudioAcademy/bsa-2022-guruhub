import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderWidth: 1.5,
    borderRadius: 21,
    padding: 6,
    marginRight: 10,
  },
  text: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_200,
    fontSize: 12,
    lineHeight: 15,
    marginLeft: 3,
  },
  activeItem: {
    backgroundColor: AppColor.TEXT.GRAY_100,
  },
  activeText: {
    color: AppColor.TEXT.GRAY_400,
  },
  logoText: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 16,
    lineHeight: 19,
  },
  logoTextWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    width: 30,
    height: 30,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { styles };
