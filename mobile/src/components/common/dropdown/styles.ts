import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
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
