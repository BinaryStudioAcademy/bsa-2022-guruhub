import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  button: {
    borderRadius: 28,
    backgroundColor: AppColor.BRAND.BLUE_100,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  label: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 16,
    lineHeight: 16,
  },
});

export { styles };
