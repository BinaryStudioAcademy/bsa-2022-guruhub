import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  label: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 24,
    marginBottom: 20,
  },
  tableWrapper: {
    flexDirection: 'row',
  },
  actionWrapper: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
});

export { styles };
