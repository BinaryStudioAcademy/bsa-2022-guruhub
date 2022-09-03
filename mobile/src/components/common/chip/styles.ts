import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  cell: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  text: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 12,
    lineHeight: 16,
  },
});

export { styles };
