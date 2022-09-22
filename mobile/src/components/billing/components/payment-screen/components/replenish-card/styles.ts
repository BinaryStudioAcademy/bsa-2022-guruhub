import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColor.BACKGROUND.GRAY_200,
    borderRadius: 20,
    marginBottom: 30,
  },
  title: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 24,
    lineHeight: 32,
  },
  activeCard: {
    shadowColor: AppColor.BRAND.BLUE_100,
    elevation: 20,
  },
  activeText: {
    color: AppColor.BRAND.BLUE_100,
  },
});

export { styles };
