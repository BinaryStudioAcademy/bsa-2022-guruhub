import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: AppColor.BACKGROUND.GRAY_200,
  },
  headerText: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 18,
    lineHeight: 24,
  },
  rowData: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 25,
  },
  rowTitle: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 14,
    lineHeight: 19,
    width: 90,
    marginRight: 30,
  },
  rowContent: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_200,
    fontSize: 14,
    lineHeight: 19,
    maxWidth: 180,
  },
});

export { styles };
