import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  label: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    backgroundColor: AppColor.BRAND.BLUE_100,
    borderRadius: 16,
    textAlign: 'center',
  },
});

export { styles };
