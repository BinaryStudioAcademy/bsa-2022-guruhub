import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  title: {
    fontFamily: AppFontFamily.INTER_500,
    fontSize: 14,
    lineHeight: 16,
    paddingBottom: 9,
    color: AppColor.TEXT.GRAY_100,
  },
  placeholderStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  labelStyle: {
    fontWeight: 'bold',
  },
  dropDownContainerStyle: {
    backgroundColor: 'white',
    height: 100,
  },
  listParentContainerStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
  searchContainerStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
  searchTextInputStyle: {
    color: 'white',
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
