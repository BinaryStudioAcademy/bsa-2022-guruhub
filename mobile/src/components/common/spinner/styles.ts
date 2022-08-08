import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';
import { ZIndexes } from '~/common/enums/ui/ui';

const styles = StyleSheet.create({
  overflowContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    elevation: 1,
    zIndex: ZIndexes.SPINNER_LAYER,
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
});

export { styles };
