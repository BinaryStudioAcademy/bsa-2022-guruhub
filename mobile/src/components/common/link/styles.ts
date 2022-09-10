import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.BRAND.BLUE_100,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    padding: 5,
  },
});

export { styles };
