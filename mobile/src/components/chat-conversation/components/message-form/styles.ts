import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    padding: 10,
  },
  input: {
    flex: 1,
    alignSelf: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: AppColor.BRAND.BLUE_100,
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export { styles };
