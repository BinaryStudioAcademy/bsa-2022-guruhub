import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  colLeft: {
    flex: 2,
    marginRight: 15,
  },
  colRight: {
    flex: 3,
    alignItems: 'flex-start',
  },
  title: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_500,
    fontSize: 18,
    lineHeight: 21,
  },
  text: {
    color: AppColor.TEXT.GRAY_200,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 14,
    lineHeight: 19,
  },
});

export { styles };
