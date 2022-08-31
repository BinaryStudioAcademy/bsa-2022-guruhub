import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  tableContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: AppColor.BACKGROUND.GRAY_100,
    borderRadius: 6,
  },
  tableTitle: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 20,
    marginVertical: 20,
  },
  tableWrapper: {
    flexDirection: 'row',
  },
});

export { styles };
