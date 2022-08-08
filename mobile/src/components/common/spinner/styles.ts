import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  overflowContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    elevation: 1,
    zIndex: 100,
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
});

export { styles };
