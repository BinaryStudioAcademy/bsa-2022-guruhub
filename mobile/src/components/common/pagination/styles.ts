import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
  textCount: {
    fontSize: 14,
    color: 'white',
  },
  back: {
    width: 7,
    height: 7,
    borderLeftWidth: 1.5,
    borderTopWidth: 1.5,
    transform: [{ rotate: '-45deg' }],
  },
  next: {
    width: 7,
    height: 7,
    borderRightWidth: 1.5,
    borderTopWidth: 1.5,
    transform: [{ rotate: '45deg' }],
  },
  disabled: {
    borderColor: AppColor.TEXT.GRAY_200,
  },
  enabled: {
    borderColor: 'white',
  },
});

export { styles };
