import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  scrollView: {
    minWidth: '100%',
  },
  dataText: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 14,
    lineHeight: 24,
    color: AppColor.TEXT.GRAY_200,
    marginTop: 10,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 16,
    lineHeight: 21,
    color: AppColor.TEXT.GRAY_100,
    marginHorizontal: 10,
  },
  headerCell: {
    borderColor: AppColor.BACKGROUND.GRAY_200,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  verticalSeparator: {
    borderLeftWidth: 1,
  },
});

export { styles };
