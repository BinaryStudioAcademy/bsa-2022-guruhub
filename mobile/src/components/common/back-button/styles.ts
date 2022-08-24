import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  backButton: {
    borderColor: AppColor.BRAND.BLUE_100,
    width: 10,
    height: 10,
    margin: 20,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    transform: [{ rotate: '-45deg' }],
  },
});

export { styles };
