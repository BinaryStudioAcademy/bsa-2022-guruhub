import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  id: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 14,
    lineHeight: 24,
    color: AppColor.TEXT.GRAY_200,
  },
});

export { styles };
