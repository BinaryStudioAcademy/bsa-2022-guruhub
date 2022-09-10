import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
