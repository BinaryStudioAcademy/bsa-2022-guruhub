import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 42,
    borderWidth: 1,
    borderRadius: 21,
  },
  text: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 12,
    lineHeight: 15,
    marginLeft: 2,
  },
  activeItem: {
    backgroundColor: AppColor.TEXT.GRAY_200,
  },
  activeText: {
    color: AppColor.TEXT.GRAY_400,
  },
  logoText: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 16,
    lineHeight: 19,
    alignText: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
});

export { styles };
