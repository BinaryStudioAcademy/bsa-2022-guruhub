import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 0,

    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
  searchFieldContainer: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    paddingVertical: 15,
  },
  spinnerContainer: {
    flex: 1,
  },
});

export { styles };
