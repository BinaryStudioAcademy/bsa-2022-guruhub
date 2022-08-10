import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
  circle_1: {
    position: 'absolute',
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: AppColor.BRAND.BLUE_100,
    bottom: 147,
    left: -34,
  },
  circle_2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: AppColor.BRAND.BLUE_100,
    top: -65,
    right: -43,
  },
  logo: {
    height: 34,
  },
});

export { styles };
