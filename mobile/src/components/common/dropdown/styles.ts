import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  label: {
    fontFamily: AppFontFamily.INTER_500,
    fontSize: 14,
    lineHeight: 16,
    paddingBottom: 9,
    color: AppColor.TEXT.GRAY_100,
  },
  dropDown: {
    minHeight: 45,
    paddingHorizontal: 15,
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: AppColor.BACKGROUND.GRAY_300,
  },
  textStyle: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 15,
    lineHeight: 24,
    color: AppColor.TEXT.GRAY_100,
  },
  placeholderStyle: {
    color: AppColor.TEXT.GRAY_200,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 15,
    lineHeight: 24,
  },
  modalContentContainerStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
  searchContainerStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
  searchTextInputStyle: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 15,
    lineHeight: 24,
    color: AppColor.TEXT.GRAY_100,
    paddingHorizontal: 15,
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: AppColor.BACKGROUND.GRAY_300,
  },
  listItemContainerStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
    paddingHorizontal: 15,
  },
  listItemLabelStyle: {
    fontFamily: AppFontFamily.INTER_500,
  },
  error: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 12,
    lineHeight: 16,
    color: AppColor.SUPPORT.ERROR_RED_100,
    marginTop: 9,
  },
});

export { styles };
