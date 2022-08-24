import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,

    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
  searchIconContainer: {
    marginRight: 24,
  },
  searchFieldContainer: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    paddingVertical: 15,
  },
});

export { styles };
