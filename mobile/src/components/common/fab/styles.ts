import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    backgroundColor: AppColor.BRAND.BLUE_100,
    width: 56,
    height: 56,
    borderRadius: 50,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.9,
  },
});

export { styles };
