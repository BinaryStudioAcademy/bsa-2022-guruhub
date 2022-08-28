import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

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
});

export { styles };
