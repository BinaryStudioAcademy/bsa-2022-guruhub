import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  label: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    borderRadius: 16,
    borderWidth: 1,
    textAlign: 'center',
  },
});

export { styles };
