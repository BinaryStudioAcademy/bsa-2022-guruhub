import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    borderRadius: 10,
    marginBottom: 25,
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
    marginTop: 25,
  },
  rowTitle: {
    flex: 2,
    marginRight: 30,
  },
  title: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 14,
    lineHeight: 19,
  },
  rowContent: {
    flex: 3,
    alignItems: 'flex-start',
  },
  content: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_200,
    fontSize: 14,
    lineHeight: 19,
  },
  buttonsWrapper: {
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonHide: {
    opacity: 0,
  },
  datePickerWrapper: {
    minWidth: '100%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: AppColor.BACKGROUND.GRAY_400,
  },
});

export { styles };
